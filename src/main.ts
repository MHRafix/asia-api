import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((err) => ({
          field: err.property,
          message: Object.values(err.constraints).join(', '),
        }));

        return new BadRequestException({
          statusCode: 400,
          errors: formattedErrors,
        });
      },

      validationError: {
        target: false,
        value: true,
      },
    }),
  );

  // prevent cors err
  app.enableCors({
    origin: [
      'https://studio.apollographql.com',
      'http://localhost:5173',
      'https://flowtrack365.vercel.app',
    ],
    credentials: true,
  });

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('Asia Adventures API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT, () => {
    console.log('App is running on port :--', process.env.PORT);
  });
}

bootstrap();
