import { Controller, Get, Post, Put, Query } from '@nestjs/common'
import { GetReviewsDto } from './dto/get-reviews.dto'
import { Reviews } from './models/review'
import { ReviewsService } from './reviews.service'

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly ReviewsService: ReviewsService) {}

  @Get()
  get(@Query() filters: GetReviewsDto){
    const data = this.ReviewsService.get(filters)
    return { success: !!data, data: data ?? null }
  }

  @Put()
  update() {
    const total = this.ReviewsService.update()
    return { success: !!total, total: total ?? null }
  }
}
