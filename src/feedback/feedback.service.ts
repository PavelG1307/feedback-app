import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GetFeedbackDto } from './dto/get-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private readonly httpService: HttpService) {}
  get(filters: GetFeedbackDto): string {
    return `get from ${filters.dateFrom} to ${filters.dateTo}`;
  }
  async update() {
    const url = 'https://api.delivery-club.ru/api1.2/reviews';
    const parseFeedback = async (limit, offset) => {
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
        .toPromise();
      return response.data;
    };
    const feedbacks = await parseFeedback(1, 0);
    const total = feedbacks.total;
    const maxLimit = 100;
    for (let i; i < total / maxLimit; i++) {
      // const feedbacksAll = await parseFeedback(maxLimit, maxLimit * i);
      // await db.UpdateOrInsert(feedbacksAll);
    }
    console.log(feedbacks);
    return { success: true, feedbacks };
  }
}
