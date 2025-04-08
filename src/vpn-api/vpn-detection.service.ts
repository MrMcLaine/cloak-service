import { Injectable } from '@nestjs/common';
import { botReasons } from '../cloak/constants';
import { VpnApiService } from './vpn-api.service';

@Injectable()
export class VpnDetectionService {
    constructor(private readonly vpnApiService: VpnApiService) {}

    async check(ip: string): Promise<string | null> {
        const securityData = await this.vpnApiService.getSecurityData(ip);

        if (!securityData) return null;

        const { vpn, proxy, tor, relay } = securityData;

        if (vpn || proxy || tor || relay) {
            return botReasons.VPN_DETECTION;
        }

        return null;
    }
}
