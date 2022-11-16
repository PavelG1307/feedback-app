import { Controller, Get, Post, Put, Query } from '@nestjs/common'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetReviewsDto } from './dto/get-reviews.dto'
import { ResponseGetReviewsDto } from './dto/res-get-update.dto'
import { ResponseUpdateReviewsDto } from './dto/res-update-review.dto'
import { ReviewsService } from './reviews.service'

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly ReviewsService: ReviewsService) {}

  @ApiOperation({summary: 'Get reviews'})
  @ApiResponse({ status: 200, type: ResponseGetReviewsDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Get()
  async get(@Query() filters: GetReviewsDto): Promise<ResponseGetReviewsDto> {
    const data = await this.ReviewsService.get(filters)
    return data
  }

  @ApiOperation({summary: 'Start parsing reviews'})
  @ApiResponse({ status: 200, type: ResponseUpdateReviewsDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Put()
  async update(): Promise<ResponseUpdateReviewsDto> {
    const total = await this.ReviewsService.update()
    return { success: !!total, total: total ?? null }
  }
}
