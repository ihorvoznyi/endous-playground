import { Module } from '@nestjs/common';
import { ConfigModule } from '@app/shared/config';
import { DatabaseModule } from '@app/shared/database';
import { UserModule } from './modules/user';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
