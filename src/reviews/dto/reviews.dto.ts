import { AnswerDto } from './answer.dto'

export class ReviewsDto {
  answers: AnswerDto[]
  author: string
  body: string
  icon: string
  orderHash: string
  rated: Date
}
