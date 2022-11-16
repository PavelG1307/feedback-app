import { Controller, Get, Post, Put, Query } from '@nestjs/common';
import { GetReviewsDto } from './dto/get-reviews.dto';
import { Reviews } from './models/review';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly ReviewsService: ReviewsService) {}

  @Get()
  get(@Query() filters: GetReviewsDto): Promise<Reviews[]> {
    return this.ReviewsService.get(filters);
  }

  @Put()
  update() {
    return this.ReviewsService.update();
  }
}
