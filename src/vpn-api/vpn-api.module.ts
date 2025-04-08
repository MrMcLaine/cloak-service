import { Module } from '@nestjs/common';
import { VpnApiService } from './vpn-api.service';
import { VpnDetectionService } from './vpn-detection.service';

@Module({
    providers: [VpnApiService, VpnDetectionService],
    exports: [VpnDetectionService],
})
export class VpnApiModule {}
