import { IsIP } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckRequestDto {
    @ApiProperty({ example: '8.8.8.8', description: 'Client IP address' })
    @IsIP()
    ip: string;
}
