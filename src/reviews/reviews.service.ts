import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
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
    if (filters?.order && filters?.order !== 'DESC' && filters?.order !== 'ASC') return null
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
    return { count: reviews.count, reviews: reviews.rows }
  }

  async update(): Promise<number> {
    const url = 'https://api.delivery-club.ru/api1.2/reviews'
    const chainId = 48274
    const parseReviews = async (limit, offset) => {
      const params = { chainId, limit, offset }
      const method = 'get'
      const response = await this.httpService.get(url, { method, url, params }).toPromise()
      return response.data
    }
    const limit = 1000
    const { total, reviews } = await parseReviews(limit, 0)

    if (!reviews) return 0

    await this.reviewsModel.bulkCreate(reviews, { updateOnDuplicate: ['body', 'icon', 'answers'] })

    for (let i = 0; i < total / limit; i++) {
      const resData = await parseReviews(limit, limit * i)
      await this.reviewsModel.bulkCreate(resData.reviews, { updateOnDuplicate: ['body', 'icon', 'answers'] })
    }
    return total
  }
}
