import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import { EnvName } from '../common/enums';

export const RedisClientProvider: Provider = {
    provide: 'REDIS_CLIENT',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        const url =
            configService.get<string>(EnvName.REDIS_URL) ??
            'redis://redis:6379';
        console.log('redis url', url);
        const client = createClient({ url });
        await client.connect();
        return client;
    },
};
