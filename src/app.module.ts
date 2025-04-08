import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/appConfigModule';
import { CloakModule } from './cloak/cloak.module';
import { VpnApiModule } from './vpn-api/vpn-api.module';
import { RedisModule } from './redis/redis.module';

@Module({
    imports: [AppConfigModule, CloakModule, VpnApiModule, RedisModule],
})
export class AppModule {}
