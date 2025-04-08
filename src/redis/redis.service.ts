import { Injectable } from '@nestjs/common';
import { MAX_REQUESTS_PER_MINUTE, ONE_MINUTE_TTL } from './constants';
import { RedisDefaultService } from './redis-default.service';
import { transformIpToRedisKey } from './utils';

@Injectable()
export class RedisService {
    constructor(private readonly redisDefaultService: RedisDefaultService) {}

    async isRateLimited(ip: string): Promise<boolean> {
        const key = transformIpToRedisKey(ip);
        const count = await this.redisDefaultService.incrementWithTTL(
            key,
            ONE_MINUTE_TTL
        );

        return count > MAX_REQUESTS_PER_MINUTE;
    }
}
