import { Redis } from 'ioredis';
import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENT } from '@app/shared/constants/di-tokens';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT) private redisClient: Redis) {}

  public async get(key: string) {
    return this.redisClient.get(key);
  }

  public async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  public async setex(
    key: string,
    value: string,
    expiry: number,
  ): Promise<void> {
    await this.redisClient.setex(key, expiry, value);
  }

  public async del(key: string) {
    await this.redisClient.del(key);
  }

  public get client() {
    return this.redisClient;
  }
}
