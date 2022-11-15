import { Controller, Get, Post, Put, Query } from '@nestjs/common';
import { GetFeedbackDto } from './dto/get-feedback.dto';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly FeedbackService: FeedbackService) {}

  @Get()
  get(@Query() filters: GetFeedbackDto): string {
    return this.FeedbackService.get(filters);
  }

  @Put()
  update() {
    return this.FeedbackService.update();
  }
}
