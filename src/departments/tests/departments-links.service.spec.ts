import createMockInstance from 'jest-create-mock-instance';
import {
    DictionaryResourcesService,
    LinksUtilsService,
    PaginationService,
    ResourcesDTO
} from '../../core';
import { DepartmentDTO } from '../../dtos';
import { DepartmentLinksService } from '../departments-links.service';
import ConfigService from './../../config/config.service';

describe('Departments Links Service', () => {
    let service: DepartmentLinksService;
    let linksUtils: LinksUtilsService;
    let paginationService: PaginationService;
    let dictionaryService: DictionaryResourcesService;
    let permissions: Array<any>;
    let configService: ConfigService;

    beforeEach(() => {
        linksUtils = new LinksUtilsService();
        paginationService = new PaginationService();
        dictionaryService = new DictionaryResourcesService();
        dictionaryService.add('departments', DepartmentDTO);
        configService = createMockInstance(ConfigService);
        jest.spyOn(configService, 'get').mockReturnValue(
            'http://test.seekda.com',
        );

        service = new DepartmentLinksService(
            linksUtils,
            paginationService,
            dictionaryService,
            configService,
        );
    });

    describe('Get Links', () => {
        it('should return all links', () => {
            permissions = [
                {
                    name: 'PUBLIC',
                },
            ];

            const dto = new DepartmentDTO();
            dto.id = 1;
            const result = service.getLinks(dto, permissions);

            const read = {
                method: 'GET',
                rel: 'self',
                url: 'http://test.seekda.com/departments/1',
            };
            const parent = {
                method: 'GET',
                rel: 'parent',
                url: 'http://test.seekda.com/departments',
            };
            const init = {
                method: 'GET',
                rel: 'init',
                url:
                    'http://test.seekda.com/required-resources?schema=departments',
            };
            const links = {
                self: {
                    id: 1,
                    read,
                    parent,
                    init,
                },
            };
            expect(result).toBeDefined();
            expect(result).toEqual(links);
        });

        it('should return none', () => {
            permissions = [];

            const dto = new DepartmentDTO();
            dto.id = 1;
            const result = service.getLinks(dto, permissions);
            const init = {
                method: 'GET',
                rel: 'init',
                url:
                    'http://test.seekda.com/required-resources?schema=departments',
            };
            const links = {
                self: {
                    id: 1,
                    init,
                },
            };
            expect(result).toBeDefined();
            expect(result).toEqual(links);
        });
    });

    describe('Get List Links', () => {
        it('should return', () => {
            const expected = {};
            const result = service.getListLinks();
            expect(result).toBeDefined();
            expect(result).toEqual(expected);
        });
    });

    describe('Get Order Links', () => {
        it('should return order links', () => {
            const dto = new ResourcesDTO<DepartmentDTO>(DepartmentDTO);
            dto.query = { order: 'id, asc' };
            const result = service.getOrderLinks(dto);

            const expected = {
                orderedBy: { field: 'id', order: ' asc' },
                id: {
                    asc: {
                        method: 'GET',
                        rel: 'departments.get',
                        url: 'http://test.seekda.com/departments?order=id,asc',
                    },
                    desc: {
                        method: 'GET',
                        rel: 'departments.get',
                        url: 'http://test.seekda.com/departments?order=id,desc',
                    },
                },
                name: {
                    asc: {
                        method: 'GET',
                        rel: 'departments.get',
                        url:
                            'http://test.seekda.com/departments?order=name,asc',
                    },
                    desc: {
                        method: 'GET',
                        rel: 'departments.get',
                        url:
                            'http://test.seekda.com/departments?order=name,desc',
                    },
                },
            };
            expect(result).toBeDefined();
            expect(result).toEqual(expected);
        });
    });

    describe('Get Filter Links', () => {
        it('should return', () => {
            const result = service.getFilterLinks();
            expect(result).toBeUndefined();
        });
    });

    describe('Get Templates Links', () => {
        it('should not appear in menu', () => {
            const result = service.shouldAppearInMenu();

            expect(result).toBeFalsy();
        });

        it('should return all links', () => {
            permissions = [
                {
                    name: 'PUBLIC',
                },
            ];

            const result = service.getTemplate(permissions);
            const links = {
                department: {
                    read: {
                        method: 'GET',
                        rel: 'self',
                        url: 'http://test.seekda.com/departments/:departmentId',
                    },
                },
                departments: {
                    read: {
                        method: 'GET',
                        rel: 'self',
                        url: 'http://test.seekda.com/departments',
                    },
                },
            };
            expect(result).toBeDefined();
            expect(result).toEqual(links);
        });

        it('should return none', () => {
            permissions = [];

            const result = service.getTemplate(permissions);
            const links = {
                department: {},
                departments: {},
            };
            expect(result).toBeDefined();
            expect(result).toEqual(links);
        });
    });
});
