import { Module } from '@nestjs/common';
import { ConfigModule } from '@app/shared/config';
import { DatabaseModule } from '@app/shared/database';
import { StripeModule } from 'libs/infra/stripe';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [DatabaseModule, ConfigModule, StripeModule],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
