export class GetReviewsDto {
  readonly limit?: string | number
  readonly offset?: string | number
  readonly dateFrom?: string
  readonly dateTo?: string
  readonly byAuthor?: string
  readonly byIcon?: string
  readonly byOrderHash?: string
  readonly rating?: string
  readonly orderBy?: 'rated' | 'icon'
  readonly order?: 'DESC' | 'ASC'
}
