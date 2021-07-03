import { Module } from '@nestjs/common';
import { UtilsModule } from '../../utils';
import { LinksFactoryService, LinksUtilsService } from './index';

@Module({
    imports: [
        UtilsModule,
    ],
    providers: [
        LinksFactoryService,
        LinksUtilsService
    ],
    exports: [
        LinksFactoryService,
        LinksUtilsService
    ],
})
export class LinksModule {}
