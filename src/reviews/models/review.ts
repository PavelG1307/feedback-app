import { ApiProperty } from '@nestjs/swagger'
import {
  Table,
  Model,
  Column,
  DataType,
  UpdatedAt,
  CreatedAt,
} from 'sequelize-typescript'
import { AnswerDto } from '../dto/answer.dto'

@Table({
  tableName: 'reviews',
  timestamps: true,
})
export class Reviews extends Model<Reviews> {
  @ApiProperty({ example: '1', description: 'Unique review ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  declare id?: number

  @ApiProperty({ example: 'Вкусная курочка', description: 'Body reviews' })
  @Column({ type: DataType.TEXT })
  declare body: string

  @ApiProperty({ example: '😊', description: 'User mood icon' })
  @Column({ type: DataType.TEXT })
  declare icon: string

  @ApiProperty({ example: 'Павел Горшков', description: 'Name of the review author' })
  @Column({ type: DataType.TEXT })
  declare author: string

  @ApiProperty({ example: 'c6aefd68e9543184433eb2250eb8efc5a31e8a83', description: 'Order hash' })
  @Column({ type: DataType.TEXT, unique: true })
  declare orderHash: string

  @ApiProperty({ example: '2021-11-08 16:04:28.000000 +00:00', description: 'Date and time of publication of the review' })
  @Column({ type: DataType.DATE })
  declare rated: Date

  @ApiProperty({ type: AnswerDto, description: 'List of answers' })
  @Column({ type: DataType.ARRAY(DataType.JSON) })
  declare answers?: AnswerDto

  @ApiProperty({ example: '2022-11-16 18:30:17.290000 +00:00', description: 'Date of initial parsing' })
  @Column({
    type: DataType.DATE,
  })
  @CreatedAt
  declare createdAt?: Date

  @ApiProperty({ example: '2022-11-16 18:30:17.290000 +00:00', description: 'Review update date' })
  @Column({
    type: DataType.DATE,
  })
  @UpdatedAt
  declare updatedAt?: Date
}
