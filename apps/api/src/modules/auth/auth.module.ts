import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user';
import { PAYMENT_SERVICE, PAYMENT_PACKAGE } from '@app/shared/types/grpc';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    ClientsModule.registerAsync([
      {
        name: PAYMENT_SERVICE,
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: PAYMENT_PACKAGE,
            protoPath: join(__dirname, '../../../proto/payment.proto'),
            url: config.getOrThrow('grpc.payment'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
