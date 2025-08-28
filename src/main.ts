import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.use(helmet());

  app.use(morgan('combined'));

  await app.listen(3000);
  console.log(`🚀 Taskly REST API is running on http://localhost:3000/api/v1`);
}

bootstrap();
