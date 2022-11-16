import { ApiProperty } from "@nestjs/swagger"

export class AnswerDto {
  @ApiProperty({ example: 'Спасибо за отзыв', description: 'Date and time of publication of the review' })
  answer: string

  @ApiProperty({ example: '2021-11-08 16:04:28.000000 +00:00', description: 'Date and time of publication of the answer' })
  createdAt: Date

  @ApiProperty({ example: '4bbb9f7a-22d4-418c-8505-7eb2b0e4da7f', description: 'Public uuid of the answer' })
  publicUuid: string
}
