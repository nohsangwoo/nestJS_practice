import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // transform으로 타입을 전달받는 인자의 type을 변경가는 parsInt같은 기능임
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
