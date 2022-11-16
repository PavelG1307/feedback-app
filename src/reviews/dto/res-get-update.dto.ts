import { ApiProperty } from "@nestjs/swagger"
import { Reviews } from "../models/review"

export class ResponseGetReviewsDto {
    @ApiProperty({ example: '34556', description: 'Total number of reviews' })
    count: number

    @ApiProperty({ type: [Reviews], description: 'List of reviews' })
    reviews: Reviews[]
}