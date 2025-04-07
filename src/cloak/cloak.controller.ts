import { Body, Controller, Post, Req } from '@nestjs/common';
import { Routes } from '../common/constants';
import { CloakService } from './cloak.service';
import { CheckRequestDto } from './dto';

@Controller(Routes.CLOAK.BASE)
export class CloakController {
    constructor(private readonly cloakService: CloakService) {}

    @Post(Routes.CLOAK.check)
    async check(@Body() body: CheckRequestDto, @Req() req: Request) {
        return this.cloakService.analyze(body.ip, req.headers);
    }
}
