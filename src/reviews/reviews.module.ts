import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Reviews } from './models/review'
import { ReviewsController } from './reviews.controller'
import { ReviewsService } from './reviews.service'

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [HttpModule, SequelizeModule.forFeature([Reviews])],
})
export class ReviewsModule {}
