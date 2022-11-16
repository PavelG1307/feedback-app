import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { GetReviewsDto } from './dto/get-reviews.dto'
import { Reviews } from './models/review'

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews)
    private readonly reviewsModel: typeof Reviews,
    private readonly httpService: HttpService,
  ) {}

  get( filters: GetReviewsDto ): Promise<{ count: number, rows: Reviews[] }> {
    const reviews = this.reviewsModel.findAndCountAll({
      offset: Number(filters.offset) || 0,
      limit: Number(filters.limit) || 20
    })
    return reviews
  }

  async update() {
    const url = 'https://api.delivery-club.ru/api1.2/reviews'
    const parseReviews = async (limit, offset) => {
      const response = await this.httpService
        .get(url, {
          method: 'get',
          url,
          params: {
            chainId: 48274,
            limit,
            offset,
          },
        })
        .toPromise()
      return response.data
    }
    const maxLimit = 1000
    const { total, reviews } = await parseReviews(maxLimit, 0)
    if (!reviews) console.log('dont review')
    await this.reviewsModel.bulkCreate(reviews, {
        updateOnDuplicate: ['body'] 
      })
    for (let i = 0; i < total / maxLimit; i++) {
      const resData = await parseReviews(maxLimit, maxLimit * i)
      await this.reviewsModel.bulkCreate(resData.reviews,
        {
        updateOnDuplicate: ['body'] 
      })
    }
    return { success: true, total }
  }
}
