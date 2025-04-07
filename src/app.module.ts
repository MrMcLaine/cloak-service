import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/appConfigModule';
import { CloakModule } from './cloak/cloak.module';

@Module({
    imports: [AppConfigModule, CloakModule],
})
export class AppModule {}
