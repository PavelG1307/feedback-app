import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { delay } from 'rxjs'
import { Op } from "sequelize"
import { GetReviewsDto } from './dto/get-reviews.dto'
import { ResponseGetReviewsDto } from './dto/res-get-update.dto'
import { UpdateReviewsDto } from './dto/update-reviews.dto'
import { Reviews } from './models/review'

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews)
    private readonly reviewsModel: typeof Reviews,
    private readonly httpService: HttpService,
  ) { }

  async get(filters: GetReviewsDto): Promise<ResponseGetReviewsDto> {
    const { order, orderBy, limit, offset, ratedFrom, ratedTo, ...where } = filters
    const rated = {}
    Object.assign(rated, { [Op.between]: [ratedFrom || 0, ratedTo || new Date()] })
    
    const reviews = await this.reviewsModel.findAndCountAll({
      order: [[orderBy || 'rated', order || 'DESC']],
      where: { ...where, rated, isDeleted: false },
      offset: offset || 0,
      limit: limit || 20
    })
    if (!(reviews?.rows && reviews.rows.length)) throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    return { count: reviews.count, reviews: reviews.rows }
  }

  async update(updateConfig: UpdateReviewsDto): Promise<number> | never {
    const { chainId, limit } = updateConfig
    const url = 'https://api.delivery-club.ru/api1.2/reviews'

    const parseReviews = async (limit: number, offset: number, chainId: number): Promise<{ total: number, reviews: Reviews[] }> | never => {
      const params = { chainId, limit, offset }
      const method = 'get'
      try {
        const response = await this.httpService.get(url, { method, url, params }).toPromise()
        const { total, reviews } = response.data
        if (!(total && reviews)) throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
        reviews.forEach(review => Object.assign(review, { isDeleted: false }))
        return { total, reviews }
      } catch (e) {
        console.log(e)
        throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

    let offset = 0

    const setDeleteAll = async (): Promise<void> => {
      await this.reviewsModel.update({ isDeleted: true }, { where: { isDeleted: false } })
    }
  
    const { total, reviews } = await parseReviews(limit, offset, chainId)
    const bulkUpsert = async (reviews: Reviews[]): Promise<void> => {
      await this.reviewsModel.bulkCreate(reviews, { updateOnDuplicate: ['body', 'icon', 'answers', 'isDeleted'] })
    }

    await setDeleteAll()
    await bulkUpsert(reviews)
    for (let i = 0; i < total / limit; i++) {
      const resData = await parseReviews(limit, offset, chainId)
      await bulkUpsert(resData.reviews)
      offset += limit
      await delay(1000);
    }
    return total
  }
}
