import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { createApp } from "./create-app";


async function bootstrap() {
  const rawApp = await NestFactory.create(AppModule);
  const app = createApp(rawApp);
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Posts')
    .setDescription('CRUD API')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 5000);

  await app.listen(port, () => {
    Logger.log(`Application started on http://localhost:${port}.`, 'Main');
    Logger.log(
      `Swagger documentation on http://localhost:${port}/api-doc.`,
      'Main',
    );
  });
}
bootstrap();
