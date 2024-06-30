import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { appConfig, dbConfig, redisConfig } from './configs';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [redisConfig, dbConfig, appConfig],
    }),
  ],
})
export class ConfigModule {}
