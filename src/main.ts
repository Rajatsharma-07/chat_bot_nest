import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    allowedHeaders: '*'
  })
  let PORT = process.env.PORT || 4500;
  await app.listen(PORT, () => {
    console.log(`App is listening to PORT: ${PORT}`);
  });
}
bootstrap();
