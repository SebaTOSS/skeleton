import { Module } from '@nestjs/common';
import { RequiredResourcesFactoryService } from '.';
import { LoggerModule } from '../../interceptors';
import { ServicesModule } from '../services';
import { DictionaryResourcesService } from './dictionary-resources.service';
import { RequiredResourcesController } from './required-resources.controller';

@Module({
    imports: [ServicesModule, LoggerModule],
    controllers: [RequiredResourcesController],
    providers: [RequiredResourcesFactoryService, DictionaryResourcesService],
    exports: [RequiredResourcesFactoryService, DictionaryResourcesService],
})
export class RequiredResourcesModule {}
