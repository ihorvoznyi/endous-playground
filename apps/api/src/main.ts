import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const config = app.get(ConfigService);
  const port = config.get('ports.api');
  await app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
  });
}
bootstrap();
