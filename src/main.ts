import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('pug');
  await app.listen(7000);
  console.log(`Listen Port 7000... `);
}
bootstrap();
