// Packages
import helmet from 'helmet';
import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

//
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const config = app.get(ConfigService);

  app.use([
    session({
      name: config.getOrThrow('session.name'),
      secret: config.getOrThrow('session.secret'),
      cookie: {
        secure: config.get('MODE') === 'production',
        httpOnly: true,
      },
    }),
    helmet(),
  ]);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors();

  const port = config.get('ports.api');
  await app.listen(port);
  console.log(`App is listening on http://localhost:${port}`);
}
bootstrap();
