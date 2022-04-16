import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { graphqlUploadExpress } from 'graphql-upload';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import setCorsOption from '~/lib/setCorsOption';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors(setCorsOption<string>(
    [
      'https://admin.junggri.com',
      'http://localhost:3002',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://admin.junggri.com',
    ],
  ));

  app.use(compression())
    .use(cookieParser())
    .use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  process.on('uncaughtException', function(err) {
    console.error('uncaughtException (Node is alive)', err);
  });


  await app.listen(5000, '0.0.0.0');

  console.log(`listen 5000 port`);

}

bootstrap();
