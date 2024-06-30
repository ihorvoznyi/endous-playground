import { Redis } from 'ioredis';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RedisService } from './redis.service';
import { REDIS_CLIENT } from '@app/shared/constants/di-tokens';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: async (config: ConfigService) => {
        try {
          const redisInstance = new Redis(config.getOrThrow('redis.host'));

          redisInstance.on('connect', () => {
            console.info('Redis connected successfully');
          });

          redisInstance.on('error', (error) => {
            throw new Error(`Redis connection failed: ${error}`);
          });

          return redisInstance;
        } catch (error) {
          console.error('Failed to configure Redis', error);
          throw error;
        }
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
