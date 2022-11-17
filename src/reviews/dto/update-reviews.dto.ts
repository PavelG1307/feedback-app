import { ApiProperty } from "@nestjs/swagger"
import { IsNumberString, IsOptional } from "class-validator"

export class UpdateReviewsDto {
  @ApiProperty({ example: 1000, default: 1000, required: false, description: 'The maximum number of reviews in the response'})
  @IsOptional()
  @IsNumberString()
  readonly limit?: number

  @ApiProperty({ example: 48274, default: 48274, required: false, description: 'Сompany id' })
  @IsOptional()
  @IsNumberString()
  readonly chainId?: number
}
function Prop(arg0: { default: Date }) {
  throw new Error("Function not implemented.")
}

