import { Module } from '@nestjs/common';
import { ConfigModule } from '@app/shared/config';
import { DatabaseModule } from '@app/shared/database';

@Module({
  imports: [DatabaseModule, ConfigModule],
})
export class PaymentModule {}
