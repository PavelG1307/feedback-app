import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsDate, IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator"

export class GetReviewsDto {
  
  @ApiProperty({ example: 20, default: 20, description: 'The maximum number of reviews in the response'})
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

  @ApiProperty({ example: new Date(), required: false, description: 'Filtering by date (from)' })
  @IsOptional()
  @IsDate()
  readonly ratedFrom?: Date
  
  @ApiProperty({ example: new Date(), required: false, description: 'Filtering by date (to)' })
  @IsOptional()
  @IsDate()
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
