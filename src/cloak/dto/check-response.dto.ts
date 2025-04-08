import { ApiProperty } from '@nestjs/swagger';

export class CheckResponseDto {
    @ApiProperty({
        example: true,
        description: 'Indicates if request comes from a bot',
    })
    isBot: boolean;

    @ApiProperty({
        example: ['User-Agent header is suspicious'],
        description: 'Reasons for detection',
    })
    reasons: string[];
}
