import { Module } from '@nestjs/common';
import { VpnApiService } from './vpn-api.service';
import { VpnDetectionService } from './vpn-detection.service';

@Module({
    providers: [VpnApiService, VpnDetectionService],
})
export class VpnApiModule {}
