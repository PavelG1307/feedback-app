import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { AxiosResponse } from 'axios'
import { GetReviewsDto } from './dto/get-reviews.dto'
import { ResponseGetReviewsDto } from './dto/res-get-update.dto'
import { Reviews } from './models/review'

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews)
    private readonly reviewsModel: typeof Reviews,
    private readonly httpService: HttpService,
  ) { }

  async get(filters: GetReviewsDto): Promise<ResponseGetReviewsDto> {
    if (filters?.order && filters?.order !== 'DESC' && filters?.order !== 'ASC') {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
    }

    const order: [] | [[string, 'DESC' | 'ASC']] = filters.orderBy ? [[filters.orderBy, filters?.order || 'DESC']] : []
    const reviews = await this.reviewsModel.findAndCountAll({
      order,
      where: {
        author: filters?.byAuthor,
        icon: filters?.byIcon,
        orderHash: filters?.byOrderHash
      },
      // TODO: Поправить фильтры
      offset: Number(filters.offset) || 0,
      limit: Number(filters.limit) || 20
    })
    if (!reviews?.rows || reviews.rows.length === 0) throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    return { count: reviews.count, reviews: reviews.rows }
  }

  async update(): Promise<number> | never
  async update(data?: {chainId?: number, limit?: number}): Promise<number> | never {
    const KFC_ID = 48274
    const chainId = data.chainId || KFC_ID
    const limit = data.limit || 1000
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

    await this.reviewsModel.bulkCreate(reviews, { updateOnDuplicate: ['body', 'icon', 'answers'] })

    for (let i = 0; i < total / limit; i++) {
      const resData = await parseReviews(limit, limit * i, chainId)
      await this.reviewsModel.bulkCreate(resData.reviews, { updateOnDuplicate: ['body', 'icon', 'answers'] })
      // TODO: Сделать задержку
    }
    return total
  }
}
