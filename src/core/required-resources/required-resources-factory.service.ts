import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ResourceDTO, ResourcesDTO } from '../dtos';
import { SchemaException } from '../exceptions';
import CONSTANTS from './constants';
import { DictionaryResourcesService } from './dictionary-resources.service';
import { AbstractAdditionalResources } from './resources/abstract-additional-resources';

@Injectable()
export class RequiredResourcesFactoryService {
    @Inject()
    private readonly dictionaryService: DictionaryResourcesService;

    @Inject()
    private readonly moduleRef: ModuleRef;

    private readonly services: any = {};

    getService(name: string): AbstractAdditionalResources {
        const service: AbstractAdditionalResources = this.services[name];
        return service;
    }

    async createAdditionalResources(resource: ResourceDTO, ...params: any) {
        const { name } = resource.constructor;
        const service: AbstractAdditionalResources = this.getService(name);
        return await service.getAdditionalResources(resource, ...params);
    }

    async createAdditionalResourcesFilter(
        resource: ResourcesDTO<any>,
        ...params: any
    ) {
        const { name } = resource.type;
        const service: AbstractAdditionalResources = this.getService(name);
        return await service.getAdditionalResourcesFilter(resource, ...params);
    }

    async createAdditionalResourcesBySchema(schema: string, ...params: any) {
        const resource = this.dictionaryService.getResource(schema);
        if (resource) {
            return await this.createAdditionalResources(resource, ...params);
        }

        throw new SchemaException();
    }

    register(services: Array<any>) {
        services.forEach(service => {
            const dispatcher = this.moduleRef.get(service.name, {
                strict: false,
            });
            const resolvers = Reflect.getMetadata(
                CONSTANTS.ADDITIONAL_RESOURCES,
                service,
            );
            resolvers.resources.forEach(element => {
                this.services[element.name] = dispatcher;
                this.dictionaryService.add(element.name, element);
            });
        });
    }
}
