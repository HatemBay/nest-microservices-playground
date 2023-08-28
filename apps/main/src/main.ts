/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://wffroruz:9Au6TXmNSy8GSlUI7QklebOu-CJiXkn_@goose.rmq2.cloudamqp.com/wffroruz',
      ],
      queue: 'main_queue',
      queueOptions: {
        // * Queue can be durable which means it's stored on the hard disk or
        // * transient meaning that's it's stored in the RAM
        durable: false,
      },
    },
  });
  // app.enableCors({
  //   origin: 'http://localhohst:4200',
  // });
  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3001;
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log('🚀 Microservice is listening');
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
