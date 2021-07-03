/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import * as _ from 'lodash';
import { LinkCreator } from './link-creator.interface';
import { RequiredResourcesCreator } from './required-resources-creator.interfaces';

export abstract class ResourceDTO implements LinkCreator, RequiredResourcesCreator {
    @ApiProperty()
    id: number;

    links: any;

    additionalResources: any;

    metadata: any;

    createLinks(linksService: any, permissions: Array<any>): object {
        const links = linksService.createLinks(this, permissions);

        const customLinksService = linksService.createCustomLinks(this, permissions);

        const customLinks = this.customLinks(linksService, permissions);
        this.links = {
            ...links,
            ...customLinks,
            ...customLinksService
        };
        this.cleanUp(linksService);

        return this.links;
    }

    customLinks(data: any, permissions: Array<any>): object {
        return;
    }

    cleanUp(linksService?: any) {
        if (linksService) {
            const remove = linksService.getToRemove(this);
            remove.forEach(path => {
                _.unset(this, `links.${path}`);
            });
        }
        delete this.metadata;
    }
}
