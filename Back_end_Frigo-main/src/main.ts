import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
    const PORT = process.env.PORT || 3000;
  await app.listen(PORT, '127.0.0.1');
  Logger.log(`Application running on: http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();