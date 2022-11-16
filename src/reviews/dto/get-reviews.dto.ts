import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEnum } from "class-validator"

export class GetReviewsDto {
  @ApiProperty({ example: '20', default: 20, description: 'The maximum number of reviews in the response'})
  readonly limit?: string | number

  @ApiProperty({ example: '0', default: 0, description: 'Offset relative to the first review' })
  readonly offset?: string | number

  @ApiProperty({ example: '2020-11-08 16:04:28.000000 +00:00', description: 'Filtering by date from' })
  readonly dateFrom?: string

  @ApiProperty({ example: '2021-11-08 16:04:28.000000 +00:00', description: 'Filtering by date to' })
  readonly dateTo?: string

  @ApiProperty({ example: 'Павел Горшков', description: 'Filtering by user' })
  readonly byAuthor?: string

  @ApiProperty({ example: '😊', enum: ['😊', '😖'], description: 'Filtering by the icon showing the mood of the review' })
  @IsEnum(['😊', '😖', undefined])
  readonly byIcon?: '😊' | '😖'

  @ApiProperty({ example: 'c6aefd68e9543184433eb2250eb8efc5a31e8a83', description: 'Filtering by order hash' })
  readonly byOrderHash?: string

  @ApiProperty({ example: 'rated', description: 'The field by which sorting is performed' })
  @IsEnum(['rated', 'icon', undefined])
  readonly orderBy?: 'rated' | 'icon'

  @ApiProperty({ example: 'DESC', default: 'DESC', enum: ['DESC', 'ASC'], description: 'Sorting direction' })
  @IsEnum(['DESC', 'ASC', undefined])
  readonly order?: 'DESC' | 'ASC'
}
