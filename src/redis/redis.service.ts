import { Injectable } from '@nestjs/common';
import { MAX_REQUESTS_PER_MINUTE, ONE_MINUTE_TTL } from './constants';
import { RedisDefaultService } from './redis-default.service';
import { transformIpToRedisKey } from './utils';
import { CheckResponseDto } from '../cloak/dto';

@Injectable()
export class RedisService {
    constructor(private readonly redisDefaultService: RedisDefaultService) {}

    async getCachedResult(ip: string): Promise<CheckResponseDto | null> {
        const key = transformIpToRedisKey(ip);

        return await this.redisDefaultService.get<CheckResponseDto>(key);
    }

    async cacheResult(
        ip: string,
        result: CheckResponseDto,
        ttl = ONE_MINUTE_TTL
    ): Promise<void> {
        const key = transformIpToRedisKey(ip);

        await this.redisDefaultService.set(key, result, ttl);
    }

    async isRateLimited(ip: string): Promise<boolean> {
        const key = transformIpToRedisKey(ip);
        const count = await this.redisDefaultService.incrementWithTTL(
            key,
            ONE_MINUTE_TTL
        );

        return count > MAX_REQUESTS_PER_MINUTE;
    }
}
