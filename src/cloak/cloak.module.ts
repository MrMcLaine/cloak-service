import { Module } from '@nestjs/common';
import { CloakController } from './cloak.controller';
import { CloakService } from './cloak.service';
import { VpnApiModule } from '../vpn-api/vpn-api.module';

@Module({
    imports: [VpnApiModule],
    controllers: [CloakController],
    providers: [CloakService],
})
export class CloakModule {}
