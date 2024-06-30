import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@app/shared/config';
import { DatabaseModule } from '@app/shared/database';
import { UserModule } from './modules/user';
import { AuthModule } from './modules/auth';
import { RedisModule, RedisService } from 'libs/infra/redis';
import { ConfigService } from '@nestjs/config';

import RedisStore from 'rate-limit-redis';
import { rateLimit } from 'express-rate-limit';
import { RateLimitException } from '@app/shared/exceptions';

@Module({
  imports: [ConfigModule, DatabaseModule, RedisModule, UserModule, AuthModule],
})
export class ApiModule implements NestModule {
  constructor(
    private redis: RedisService,
    private config: ConfigService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        rateLimit({
          windowMs: this.config.get('rateLimit.auth.ttl'),
          limit: this.config.get('rateLimit.auth.max'),
          store: new RedisStore({
            // @ts-expect-error: rate-limit-redis types are incorrect
            sendCommand: (...args: string[]) => this.redis.client.call(...args),
          }),
          handler: () => {
            throw new RateLimitException();
          },
        }),
      )
      .forRoutes('/auth/login');
  }
}
