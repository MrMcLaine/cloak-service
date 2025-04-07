import { Module } from '@nestjs/common';
import { configModuleOptions } from './config-module-options';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot(configModuleOptions)],
})
export class AppConfigModule {}
