import { AnswerDto } from './answer.dto'
import { ProductDto } from './product.dto'

export class ReviewsDto {
  answers: AnswerDto[]
  author: string
  body: string
  icon: string
  orderHash: string
  rated: Date
  products: ProductDto[]
}
