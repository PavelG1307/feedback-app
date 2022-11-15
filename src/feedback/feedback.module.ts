import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService],
  imports: [HttpModule],
})
export class FeedbackModule {}
