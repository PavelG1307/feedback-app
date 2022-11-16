import { ApiProperty } from "@nestjs/swagger"

export class ResponseUpdateReviewsDto {
    @ApiProperty({ example: true, description: 'Parsing success' })
    success: boolean

    @ApiProperty({ example: 34556, description: 'Total number of reviews' })
    total: number | null
}