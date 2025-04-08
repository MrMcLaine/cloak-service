import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisClientProvider } from './redis.provider';
import { RedisDefaultService } from './redis-default.service';
import { RedisService } from './redis.service';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [RedisDefaultService, RedisService, RedisClientProvider],
    exports: [RedisService],
})
export class RedisModule {}
