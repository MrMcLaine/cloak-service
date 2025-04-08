import { Injectable } from '@nestjs/common';
import { headerKeys } from './constants';
import {
    acceptLanguageCheckUtil,
    connectionCheckUtil,
    refererCheckUtil,
    secFetchHeadersCheckUtil,
    userAgentCheckUtil,
} from './utils';
import { CheckResponseDto } from './dto';

@Injectable()
export class CloakService {
    async analyze(
        ip: string,
        headers: Record<string, any>
    ): Promise<CheckResponseDto> {
        const reasons: string[] = [];
        console.log(ip, headers);

        const uaReason = userAgentCheckUtil(headers[headerKeys.USER_AGENT]);
        if (uaReason) reasons.push(uaReason);

        const acceptLangReason = acceptLanguageCheckUtil(
            headers[headerKeys.ACCEPT_LANGUAGE]
        );
        if (acceptLangReason) reasons.push(acceptLangReason);

        const refererReason = refererCheckUtil(headers[headerKeys.REFERER]);
        if (refererReason) reasons.push(refererReason);

        const connectionReason = connectionCheckUtil(
            headers[headerKeys.CONNECTION]
        );
        if (connectionReason) reasons.push(connectionReason);

        const secFetchReason = secFetchHeadersCheckUtil(headers);
        if (secFetchReason) reasons.push(secFetchReason);
        //check ip
        //check Content-Type
        //check rate limit
        return {
            isBot: false,
            reason: 'No reason',
        };
    }
}
