import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsEnum, IsOptional } from "class-validator"
import { Reviews } from "../models/review"

export class GetReviewsDto {
  
  @ApiProperty({ example: 20, default: 20, required: false, description: 'The maximum number of reviews in the response'})
  @IsOptional()
  @Transform(() => Number)
  limit?: number

  @ApiProperty({ example: 0, default: 0, required: false, description: 'Offset relative to the first review' })
  @Transform(() => Number)
  @IsOptional()
  offset?: number

  @ApiProperty({ example: 'rated', default: 'rated', required: false, description: 'The field by which sorting is performed' })
  @IsOptional()
  @IsEnum(['rated', 'icon'])
  orderBy?: 'rated' | 'icon'

  @ApiProperty({ example: 'DESC', default: 'DESC', enum: ['DESC', 'ASC'], required: false, description: 'Sorting direction' })
  @IsOptional()
  @IsEnum(['DESC', 'ASC'])
  order?: 'DESC' | 'ASC'

  @ApiProperty({ example: '2022-11-17T00:00:00Z', required: false, description: 'Filtering by date (from)' })
  @IsOptional()
  @Transform(() => Date)
  readonly ratedFrom?: Date
  
  @ApiProperty({ example: '2022-11-18T16:08:46Z', required: false, description: 'Filtering by date (to)' })
  @IsOptional()
  @Transform(() => Date)
  readonly ratedTo?: Date

  @ApiProperty({ example: 'Павел Горшков', description: 'Filtering by user', required: false })
  readonly author?: string

  @ApiProperty({ example: '😊', enum: ['😊', '😖'], required: false, description: 'Filtering by the icon showing the mood of the review' })
  @IsOptional()
  @IsEnum(['😊', '😖'])
  readonly icon?: '😊' | '😖'

  @ApiProperty({ example: 'c6aefd68e9543184433eb2250eb8efc5a31e8a83', required: false, description: 'Filtering by order hash' })
  readonly orderHash?: string
}

export class ResponseGetReviewsDto {
  @ApiProperty({ example: '34556', description: 'Total number of reviews' })
  count: number

  @ApiProperty({ type: [Reviews], description: 'List of reviews' })
  reviews: Reviews[]
}