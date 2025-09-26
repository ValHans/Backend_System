// untuk menjalankan tanpa docker
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.setGlobalPrefix('api');

//   await app.listen(3000);
// }
// bootstrap();
/// END ///

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // <-- Import Swagger modules

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  // --- Swagger Configuration ---
  const config = new DocumentBuilder()
    .setTitle('YouApp Backend Documentation')
    .setDescription('API documentation for the YouApp technical test project by hans using Postman')
    .setVersion('1.0')
    .addBearerAuth() // <-- Crucial for documenting JWT-protected endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // <-- Sets the documentation URL to /api-docs
  // --- End of Swagger Configuration ---

  await app.listen(3000);
}
bootstrap();
