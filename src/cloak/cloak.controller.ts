import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Routes } from '../common/constants';
import { CloakService } from './cloak.service';
import { CheckRequestDto, CheckResponseDto } from './dto';

@Controller(Routes.CLOAK.BASE)
export class CloakController {
    constructor(private readonly cloakService: CloakService) {}

    @ApiOperation({ description: 'Analyze request and detect bots' })
    @ApiResponse({
        status: 201,
        description: 'Successful detection result',
        type: CheckResponseDto,
    })
    @Post(Routes.CLOAK.check)
    async check(@Body() body: CheckRequestDto, @Req() req: Request) {
        return this.cloakService.analyze(body.ip, req.headers);
    }
}
