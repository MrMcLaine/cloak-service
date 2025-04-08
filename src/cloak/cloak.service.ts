import { Injectable } from '@nestjs/common';
import { headerObjectNames } from './constants';
import { acceptLanguageCheckUtil, userAgentCheckUtil } from './utils';
import { CheckResponseDto } from './dto';

@Injectable()
export class CloakService {
    async analyze(
        ip: string,
        headers: Record<string, any>
    ): Promise<CheckResponseDto> {
        const reasons: string[] = [];
        console.log(ip, headers);

        const uaReason = userAgentCheckUtil(
            headers[headerObjectNames.USER_AGENT]
        );

        if (uaReason) reasons.push(uaReason);

        const acceptLangReason = acceptLanguageCheckUtil(
            headers[headerObjectNames.ACCEPT_LANGUAGE]
        );
        if (acceptLangReason) reasons.push(acceptLangReason);
        //check accept language
        //check referer
        //check ip
        //check connection
        //check sec-fetch-site, sec-fetch-user, sec-fetch-mode
        //check Content-Type
        //check rate limit
        return {
            isBot: false,
            reason: 'No reason',
        };
    }
}
