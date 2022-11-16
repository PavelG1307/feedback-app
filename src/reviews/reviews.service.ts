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

  get(filters: GetReviewsDto): Promise<Reviews[]> {
    const reviews = this.reviewsModel.findAll()
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
    const { total, reviews } = await parseReviews(50, 0)
    console.log(reviews.lehgth)
    const maxLimit = 100
    for (let i; i < total / maxLimit; i++) {
      console.log('Буду делать запрос')
      // const reviewssAll = await parseReviews(maxLimit, maxLimit * i)
      // await db.UpdateOrInsert(reviewssAll)
    }
    console.log(reviews)
    return { success: true, reviews }
  }
}
