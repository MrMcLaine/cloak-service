import { Module } from '@nestjs/common';
import { CloakController } from './cloak.controller';
import { CloakService } from './cloak.service';

@Module({
    controllers: [CloakController],
    providers: [CloakService],
})
export class CloakModule {}
