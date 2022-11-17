import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
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
    const { order, orderBy, limit, offset, ratedFrom, ratedTo, ...where} = filters
    const reviews = await this.reviewsModel.findAndCountAll({
      order: [[filters.orderBy || 'rated', filters?.order || 'DESC']],
      where: { ...where, isDeleted: false},
      offset: filters.offset || 0,
      limit: filters.limit || 20
    })
    if (!reviews?.rows || !reviews.rows.length) throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    return { count: reviews.count, reviews: reviews.rows }
  }

  async update(updateConfig: UpdateReviewsDto): Promise<number> | never {
    const { chainId, limit } = updateConfig
    const url = 'https://api.delivery-club.ru/api1.2/reviews'
    const parseReviews = async (limit, offset, chainId): Promise<{total: number, reviews: Reviews[]}> | never => {
      const params = { chainId, limit, offset }
      const method = 'get'
      try {
      const response = await this.httpService.get(url, { method, url, params }).toPromise()
      const { total, reviews } = response.data
      if (!(total && reviews)) throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
      return { total, reviews }
      } catch (e) {
        console.log(e)
        throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

    const { total, reviews } = await parseReviews(limit, 0, chainId)
    reviews.map(review => review.isDeleted = false)
    await this.reviewsModel.update({ isDeleted: true }, { where: { isDeleted: false }})
    await this.reviewsModel.bulkCreate(reviews, { updateOnDuplicate: ['body', 'icon', 'answers'] })

    for (let i = 0; i < total / limit; i++) {
      const resData = await parseReviews(limit, limit * i, chainId)
      await this.reviewsModel.bulkCreate(resData.reviews, { updateOnDuplicate: ['body', 'icon', 'answers'] })
      // TODO: Сделать задержку
    }
    return total
  }
}
