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
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id?: number

  @Column({ type: DataType.UUID })
  declare uuid?: string

  @Column({ type: DataType.STRING })
  declare body: string

  @Column({ type: DataType.STRING })
  declare author: string

  @Column({ type: DataType.DATE })
  declare rated: Date

  @Column({ type: DataType.ARRAY(DataType.JSON) })
  declare answers?: AnswerDto

  @Column({
    type: DataType.DATE,
  })
  @CreatedAt
  declare createdAt?: Date

  @Column({
    type: DataType.DATE,
  })
  @UpdatedAt
  declare updatedAt?: Date
}
