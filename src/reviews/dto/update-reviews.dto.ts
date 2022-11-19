import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsOptional } from "class-validator"

export class UpdateReviewsDto {
  @ApiProperty({ example: 1000, default: 1000, required: false, description: 'The maximum number of reviews in the response'})
  @Transform(() => Number)
  @IsOptional()
  readonly limit?: number

  @ApiProperty({ example: 48274, default: process.env.DEFAUL_CHAIN_ID || 48274, required: false, description: 'Сompany id' })
  @IsOptional()
  @Transform(() => Number)
  readonly chainId?: number
}

export class ResponseUpdateReviewsDto {
  @ApiProperty({ example: true, description: 'Parsing success' })
  success: boolean

  @ApiProperty({ example: 34556, description: 'Total number of reviews' })
  total: number | null
}