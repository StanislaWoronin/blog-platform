import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '../libs/exception-filters';
import { faker } from "@faker-js/faker";
import { validationConstant } from "../libs/shared";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,

      exceptionFactory: (errorsMessages) => {
        const errorsForResponse = [];

        errorsMessages.forEach((e) => {
          const keys = Object.keys(e.constraints);
          errorsForResponse.push({
            message: e.constraints[keys[0]],
            field: e.property,
          });
        });

        throw new BadRequestException(errorsForResponse);
      },
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 5000);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Posts')
    .setDescription('CRUD API')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    Logger.log(`Application started on http://localhost:${port}.`, 'Main');
    Logger.log(
      `Swagger documentation on http://localhost:${port}/api-doc.`,
      'Main',
    );
  });
}
bootstrap();
