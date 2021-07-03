import { Global, Module, OnModuleInit } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import {
    APTExceptionsFilter,
    ErrorHandlerService,
} from './exceptions';
import { LinksFactoryService, LinksModule } from './links';
import LINKS_CONSTANTS from './links/constants';
import { AnnotationExplorerService } from './reflection/annotation-explorer.service';
import {
    RequiredResourcesFactoryService,
    RequiredResourcesModule,
} from './required-resources';
import REQUIRED_RESOURCES_CONSTANTS from './required-resources/constants';
import { SecurityModule } from './security';
import { ServicesModule } from './services/services.module';

@Global()
@Module({
    imports: [
        LinksModule,
        RequiredResourcesModule,
        ServicesModule,
        SecurityModule,
    ],
    exports: [
        ErrorHandlerService,
        LinksModule,
        RequiredResourcesModule,
        ServicesModule,
        SecurityModule,
    ],
    providers: [
        ErrorHandlerService,
        AnnotationExplorerService,
        {
            provide: APP_FILTER,
            useClass: APTExceptionsFilter,
        },
    ],
})
export class CoreModule implements OnModuleInit {
    constructor(
        private readonly linkService: LinksFactoryService,
        private readonly requiredResources: RequiredResourcesFactoryService,
        private readonly annotationExplorer: AnnotationExplorerService,
    ) {}

    public async onModuleInit() {
        const links = this.annotationExplorer.discover(
            LINKS_CONSTANTS.LINK_FACTORY,
        );
        this.linkService.register(links);

        const requiredResources = this.annotationExplorer.discover(
            REQUIRED_RESOURCES_CONSTANTS.ADDITIONAL_RESOURCES,
        );
        this.requiredResources.register(requiredResources);
    }
}
