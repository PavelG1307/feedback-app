import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { getEnvFilePath } from './core/utils'
import { ReviewsModule } from './reviews/reviews.module'
import { Reviews } from './reviews/models/review'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Reviews],
      autoLoadModels: true,
    }),
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
