import { ApiProperty } from '@nestjs/swagger'
import {
  Table,
  Model,
  Column,
  DataType,
  UpdatedAt,
  CreatedAt,
} from 'sequelize-typescript'

@Table({
  tableName: 'Reviews',
  timestamps: true,
})

export class CompanyAnswer {
  @ApiProperty({ example: 'Спасибо за отзыв', description: 'Date and time of publication of the review' })
  answer: string

  @ApiProperty({ example: '2021-11-08 16:04:28.000000 +00:00', description: 'Date and time of publication of the answer' })
  createdAt: Date

  @ApiProperty({ example: '4bbb9f7a-22d4-418c-8505-7eb2b0e4da7f', description: 'Public uuid of the answer' })
  publicUuid: string
}

export class Review extends Model<Review> {
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

  @ApiProperty({ type: [CompanyAnswer], description: 'List of answers' })
  @Column({ type: DataType.ARRAY(DataType.JSON) })
  declare answers?: CompanyAnswer[]

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare isDeleted?: boolean

  @Column({ type: DataType.DATE })
  @CreatedAt
  declare createdAt?: Date

  @Column({ type: DataType.DATE })
  @UpdatedAt
  declare updatedAt?: Date
}
