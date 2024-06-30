import { Module } from '@nestjs/common';
import { ConfigModule } from '@app/shared/config';
import { DatabaseModule } from '@app/shared/database';
import { UserModule } from './modules/user';
import { AuthModule } from './modules/auth';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, AuthModule],
})
export class ApiModule {}
