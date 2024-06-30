import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { PaymentModule } from './payment.module';
import { ConfigService } from '@nestjs/config';
import { PAYMENT_PACKAGE_NAME } from '@app/shared/types/grpc';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  const config = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: PAYMENT_PACKAGE_NAME,
      protoPath: join(__dirname, '../../../proto/payment.proto'),
      url: config.getOrThrow('grpc.payment'),
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
