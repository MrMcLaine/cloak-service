import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/appConfigModule';
import { CloakModule } from './cloak/cloak.module';
import { VpnApiModule } from './vpn-api/vpn-api.module';

@Module({
    imports: [AppConfigModule, CloakModule, VpnApiModule],
})
export class AppModule {}
