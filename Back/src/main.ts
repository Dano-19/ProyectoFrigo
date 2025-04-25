import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Permitir peticiones desde el frontend (CORS)
  app.enableCors();

  // ✅ Validaciones automáticas con class-validator y class-transformer
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // elimina propiedades no incluidas en DTOs
      forbidNonWhitelisted: true, // lanza error si hay propiedades extras
      transform: true         // convierte tipos automáticamente
    })
  );

  // ✅ Documentación Swagger
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Backend API Nest')
    .setDescription('API para manejo de tickets de reclamo')
    .setVersion('1.0')
    .addTag('Api Rest')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // ✅ Iniciar la aplicación
  await app.listen(3000);
  console.log(`🚀 Backend corriendo en http://localhost:3000`);
  console.log(`📚 Swagger disponible en http://localhost:3000/api`);
}
bootstrap();
