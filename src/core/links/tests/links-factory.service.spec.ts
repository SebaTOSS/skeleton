/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test } from '@nestjs/testing';
import {
    PaginationDTO,
    PaginationService,
    Resource,
    ResourcesDTO,
} from '../../../core';
import { LinkFactory } from '../decorators/link-factory.decorator';
import { LinksFactoryService } from '../links-factory.service';
import { LinksUtilsService } from '../links-utils.service';
import { AbstractLinkService } from '../resources/abstract-links.service';
import ConfigService from './../../../config/config.service';

class DummyDTO extends Resource {}

@LinkFactory([DummyDTO])
class DummyService extends AbstractLinkService {
    constructor(
        readonly linksUtils: LinksUtilsService,
        readonly paginationService: PaginationService,
        readonly configService: ConfigService,
    ) {
        super(linksUtils, paginationService, configService );
    }

    name = 'DummyService';
    FILTER = 'test';
    filterFields = {
        name: 'name=',
    };
    segments: Array<string> = ['test'];

    getLinks(resource: Resource, permission: any[]): object {
        return {};
    }
    getListLinks(resource: Resource, permissions: any[]): object {
        return {};
    }
    getOrderLinks(resource: Resource): object {
        return {};
    }
}

describe.skip('Links Factory Service', () => {
    let serviceFactory: LinksFactoryService;
    let service: DummyService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                LinksFactoryService,
                LinksUtilsService,
                DummyService,
                PaginationService,
            ],
            exports: [
                LinksFactoryService,
                LinksUtilsService,
                DummyService,
                PaginationService,
            ],
        }).compile();

        serviceFactory = moduleRef.get<LinksFactoryService>(
            LinksFactoryService,
        );
        service = moduleRef.get<DummyService>(DummyService);
        Reflect.defineMetadata('LINK_FACTORY', [DummyDTO], service);
    });

    it('should register a service', () => {
        serviceFactory.register([service]);

        const result = serviceFactory.getService('DummyDTO');
        expect(result).toBeDefined();
    });

    it('should create links', () => {
        const resource = new DummyDTO();
        const permissions = [];
        const links = {};
        serviceFactory.register([service]);
        const dummyService = serviceFactory.getService('DummyDTO');
        jest.spyOn(dummyService, 'getLinks');

        const result = serviceFactory.createLinks(resource, permissions);

        expect(result).toBeDefined();
        expect(result).toEqual(links);
        expect(dummyService.getLinks).toHaveBeenCalledWith(
            resource,
            permissions,
        );
    });

    it('should create list links', () => {
        const resource = new ResourcesDTO<DummyDTO>(DummyDTO);
        const permissions = [];
        const links = {};
        serviceFactory.register([service]);
        const dummyService = serviceFactory.getService('DummyDTO');
        jest.spyOn(dummyService, 'getListLinks');

        const result = serviceFactory.createList(resource, permissions);

        expect(result).toBeDefined();
        expect(result).toEqual(links);
        expect(dummyService.getListLinks).toHaveBeenCalledWith(
            resource,
            permissions,
        );
    });

    it.skip('should create order links', () => {
        const resource = new ResourcesDTO<DummyDTO>(DummyDTO);
        const links = {};
        serviceFactory.register([service]);
        const dummyService = serviceFactory.getService('DummyDTO');
        jest.spyOn(dummyService, 'getOrderLinks');

        const result = serviceFactory.createOrder(resource);

        expect(result).toBeDefined();
        expect(result).toEqual(links);
        expect(dummyService.getOrderLinks).toHaveBeenCalledWith(resource);
    });

    it.skip('should create filter links', () => {
        const resource = new ResourcesDTO<DummyDTO>(DummyDTO);
        serviceFactory.register([service]);
        const dummyService = serviceFactory.getService('DummyDTO');
        jest.spyOn(dummyService, 'getFilterLinks');

        const result = serviceFactory.createFilter(resource);

        expect(result).toBeDefined();
        expect(result).toEqual({
            fields: {
                name: 'name=',
            },
            query: {
                method: 'GET',
                rel: 'test',
                url: 'http://test.seekda.com/test/?',
            },
        });
        expect(dummyService.getFilterLinks).toHaveBeenCalledWith();
    });

    it.skip('should create pagination links', () => {
        const pagination = new PaginationDTO<DummyDTO>(DummyDTO);
        pagination.query = {};
        serviceFactory.register([service]);
        const dummyService = serviceFactory.getService('DummyDTO');
        jest.spyOn(dummyService, 'getPaginationLinks');

        const result = serviceFactory.createPagination(pagination);

        expect(result).toBeDefined();
        expect(dummyService.getPaginationLinks).toHaveBeenCalled();
    });
});
