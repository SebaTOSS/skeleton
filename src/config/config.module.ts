import config from './config-service';
import ConfigService from './config.service';
import { Module, Global } from '@nestjs/common';
import { ConfigLinksFilterController } from './config-links-filter.controller';
import { ConfigManagerLinksFilterService } from './config-manager-links-filter.service';
import { CoreModule } from '../core';

@Global()
@Module({
    imports: [CoreModule],
    controllers: [ConfigLinksFilterController],
    providers: [
        {
            provide: ConfigService,
            useValue: config
        },
        ConfigManagerLinksFilterService
    ],
    exports: [
        {
            provide: ConfigService,
            useValue: config
        },
        ConfigManagerLinksFilterService
    ],
})
export class ConfigModule {}
