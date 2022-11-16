export class GetReviewsDto {
  readonly limit?: string;
  readonly offset?: string;
  readonly dateFrom?: string;
  readonly dateTo?: string;
  readonly ratingFrom?: string;
  readonly ratingTo?: string;
  readonly sortBy?: string;
}
