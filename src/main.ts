import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  NotFoundExceptionFilter,
  UnprocessableEntityExceptionFilter,
} from './http-exceptions/http-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new NotFoundExceptionFilter(),
    new UnprocessableEntityExceptionFilter(),
  );

  await app.listen(3000);
}
bootstrap();
