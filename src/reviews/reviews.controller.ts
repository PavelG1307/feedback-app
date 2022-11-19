import { Body, Controller, Get, HttpException, HttpStatus, Put, Query } from '@nestjs/common'
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { DEFAULT_CHAIN_ID, DEFAULT_LIMIT } from 'src/core/constants'
import { GetReviewsDto, ResponseGetReviewsDto } from './dto/get-reviews.dto'
import { ResponseUpdateReviewsDto, UpdateReviewsDto } from './dto/update-reviews.dto'
import { ReviewsService } from './reviews.service'

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly ReviewsService: ReviewsService) { }

  @ApiOperation({ summary: 'Get reviews' })
  @ApiResponse({ status: 200, type: ResponseGetReviewsDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Get()
  async get(@Query() filters: GetReviewsDto): Promise<ResponseGetReviewsDto> | never {
    try {
      const data = await this.ReviewsService.get(filters)
      return data
    } catch (e) {
      console.log(e)
      if (e instanceof HttpException) throw e
      throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @ApiBody({ type: [UpdateReviewsDto] })
  @ApiOperation({ summary: 'Start parsing reviews' })
  @ApiResponse({ status: 200, type: ResponseUpdateReviewsDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Put()
  async update(@Body() body: UpdateReviewsDto): Promise<ResponseUpdateReviewsDto> | never {
    try {
      const updateConfig = {
        chainId: body?.chainId ?? DEFAULT_CHAIN_ID,
        limit: body?.limit ?? DEFAULT_LIMIT
      }
      const total = await this.ReviewsService.update(updateConfig)
      return { success: !!total, total: total ?? null }
    } catch (e) {
      console.log(e)
      if (e instanceof HttpException) throw e
      throw new HttpException('Internal error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}