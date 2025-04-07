import { IsIP } from 'class-validator';

export class CheckRequestDto {
    @IsIP()
    ip: string;
}
