import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  // Para entornos serverless
  if (process.env.NODE_ENV === 'production') {
    await app.listen(process.env.PORT || 3000);
  } else {
    await app.listen(3000);
  }
}

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}

// Para Vercel serverless
export default async function handler(req, res) {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  // Procesar la solicitud
  const server = await app.getHttpAdapter().getInstance();
  return server(req, res);
}