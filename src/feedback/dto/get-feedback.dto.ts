export class GetFeedbackDto {
  readonly limit?: string;
  readonly offset?: string;
  readonly dateFrom?: string;
  readonly dateTo?: string;
  readonly ratingFrom?: string;
  readonly ratingTo?: string;
}
