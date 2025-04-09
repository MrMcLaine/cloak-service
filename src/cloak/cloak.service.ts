import { Injectable } from '@nestjs/common';
import { VpnDetectionService } from '../vpn-api/vpn-detection.service';
import { botReasons, headerKeys } from './constants';
import { ONE_HOUR_TTL } from '../redis/constants';
import { RedisService } from '../redis/redis.service';
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
    constructor(
        private readonly vpnDetectionService: VpnDetectionService,
        private readonly redisService: RedisService
    ) {}

    async analyze(
        ip: string,
        headers: Record<string, any>
    ): Promise<CheckResponseDto> {
        const reasons: string[] = [];

        const isRateLimited = await this.redisService.isRateLimited(ip);
        if (isRateLimited) {
            return {
                isBot: true,
                reasons: [botReasons.TOO_MANY_REQUESTS],
            };
        }

        const cached = await this.redisService.getCachedResult(ip);
        if (cached) return cached;

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
            const result: CheckResponseDto = {
                isBot: true,
                reasons,
            };
            await this.redisService.cacheResult(ip, result, ONE_HOUR_TTL);
            return result;
        }

        const vpnReason = await this.vpnDetectionService.check(ip);
        if (vpnReason) {
            return {
                isBot: true,
                reasons: [vpnReason],
            };
        }

        return {
            isBot: false,
            reasons: ['No reasons'],
        };
    }
}
