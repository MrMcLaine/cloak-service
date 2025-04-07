import { Injectable } from '@nestjs/common';
import { CheckResponseDto } from './dto';

@Injectable()
export class CloakService {
    async analyze(
        ip: string,
        headers: Record<string, any>
    ): Promise<CheckResponseDto> {
        console.log(ip, headers);
        //check primitive words in the user agent
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
