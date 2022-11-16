import { INestApplication } from '@nestjs/common'
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger'

export const initSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('KFC reviews app')
    .setVersion('1.0.0')
    .setDescription('Test assignment for a backend developer vacancy')
    .addTag('Reviews app')
    .build()

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey) => methodKey,
  }

  const document = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup(process.env.API_PREFIX + '/docs', app, document)
}
