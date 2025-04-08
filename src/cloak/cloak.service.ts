import { Injectable } from '@nestjs/common';
import { VpnDetectionService } from '../vpn-api/vpn-detection.service';
import { headerKeys } from './constants';
import {
    acceptLanguageCheckUtil,
    connectionCheckUtil,
    contentTypeCheckUtil,
    geoIpCheckUtil,
    privateOrLocalIpCheckUtil,
    refererCheckUtil,
    secFetchHeadersCheckUtil,
    userAgentCheckUtil,
} from './utils';
import { CheckResponseDto } from './dto';

@Injectable()
export class CloakService {
    constructor(private readonly vpnDetectionService: VpnDetectionService) {}

    async analyze(
        ip: string,
        headers: Record<string, any>
    ): Promise<CheckResponseDto> {
        const reasons: string[] = [];

        //TODO add local/private/test networks are flagged (127.0.0.1, 192.168.*, etc).
        const isolatedChecks = [
            userAgentCheckUtil(headers[headerKeys.USER_AGENT]),
            acceptLanguageCheckUtil(headers[headerKeys.ACCEPT_LANGUAGE]),
            refererCheckUtil(headers[headerKeys.REFERER]),
            connectionCheckUtil(headers[headerKeys.CONNECTION]),
            secFetchHeadersCheckUtil(headers),
            contentTypeCheckUtil(headers[headerKeys.CONTENT_TYPE]),
            privateOrLocalIpCheckUtil(ip),
            geoIpCheckUtil(ip),
        ];

        for (const reason of isolatedChecks) {
            if (reason) reasons.push(reason);
        }

        if (reasons.length > 0) {
            return {
                isBot: true,
                reasons,
            };
        }

        const vpnReason = await this.vpnDetectionService.check(ip);
        if (vpnReason) {
            return {
                isBot: true,
                reasons: [vpnReason],
            };
        }

        //check rate limit

        return {
            isBot: false,
            reasons: ['No reasons'],
        };
    }
}
