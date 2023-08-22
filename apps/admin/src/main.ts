/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhohst:4200',
  });
  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3000;
  await app.listen(3000);
  Logger.log(
    // `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
