import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { query } from 'express'
import { delay } from 'rxjs'
import { Op } from "sequelize"
import { DEFAULT_LAZY_LOADING, DEFAULT_SORTING, DELIVERY_CLUB_URL, PARSING_TIMEOUT } from 'src/core/constants'
import { GetReviewsDto, ResponseGetReviewsDto } from './dto/get-reviews.dto'
import { UpdateReviewsDto } from './dto/update-reviews.dto'
import { IParsedData, IParserConfig } from './interfaces/parsed-data'
import { Review } from './models/review'

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review)
    private readonly reviewsModel: typeof Review,
    private readonly httpService: HttpService,
  ) { }

  async get(filters: GetReviewsDto): Promise<ResponseGetReviewsDto> {
    const { order, orderBy, limit, offset, ratedFrom, ratedTo, ...where } = filters
    if (ratedFrom && ratedTo) {
      Object.assign(where, { rated: { [Op.between]: [ratedFrom, ratedTo] } })
    } else if (ratedFrom) {
      Object.assign(where, { rated: { [Op.gte]: ratedFrom } })
    } else if (ratedTo) {
      Object.assign(where, { rated: { [Op.lte]: ratedTo } })
    }

    const reviews = await this.reviewsModel.findAndCountAll({
      order: [[ orderBy || DEFAULT_SORTING.orderBy, order || DEFAULT_SORTING.order ]],
      where: { ...where, isDeleted: false },
      offset: offset || DEFAULT_LAZY_LOADING.offset,
      limit: limit || DEFAULT_LAZY_LOADING.limit
    })
    if (!(reviews?.rows && reviews.rows.length)) throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    return { count: reviews.count, reviews: reviews.rows }
  }

  async update(updateConfig: UpdateReviewsDto): Promise<number> | never {
    const { chainId, limit } = updateConfig
    const parseReviews = async (parserConfig: IParserConfig): Promise<IParsedData> | never => {
      const method = 'get'
      try {
        const response = await this.httpService.get(DELIVERY_CLUB_URL, { method, params: parserConfig }).toPromise()
        const { total, reviews } = response.data
        if (!(total && reviews)) throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
        reviews.forEach((review: Review) => {
          return Object.assign(review, { isDeleted: false })
        })
        return { total, reviews }
      } catch (e) {
        console.log(e)
        throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

    const setDeleteAll = async (): Promise<void> => {
      await this.reviewsModel.update({ isDeleted: true }, { where: { isDeleted: false } })
    }

    const bulkUpsert = async (reviews: Review[]): Promise<void> => {
      await this.reviewsModel.bulkCreate(reviews, { updateOnDuplicate: ['body', 'icon', 'answers', 'isDeleted'] })
    }

    let offset = 0
    const { total, reviews } = await parseReviews({ limit, offset, chainId })

    await setDeleteAll()
    await bulkUpsert(reviews)
    for (let i = 0; i < total / limit; i++) {
      const resData = await parseReviews({ limit, offset, chainId })
      await bulkUpsert(resData.reviews)
      offset += limit
      await delay(PARSING_TIMEOUT);
    }
    return total
  }
}
