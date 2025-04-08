import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisDefaultService {
    constructor(
        @Inject('REDIS_CLIENT') private readonly client: RedisClientType
    ) {}

    async incrementWithTTL(key: string, ttl: number): Promise<number> {
        const multi = this.client.multi();
        multi.incr(key);
        multi.ttl(key);

        const [incrResult, ttlResult] = await multi.exec();

        const count = incrResult[1] as number;
        const currentTTL = ttlResult[1] as number;

        const NO_TTL = -1;
        if (currentTTL === NO_TTL) {
            await this.client.expire(key, ttl);
        }

        return count;
    }
}
