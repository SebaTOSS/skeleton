/* eslint-disable @typescript-eslint/camelcase */
import { LinksFactoryService } from '../../core/links';
import { DepartmentsService } from "../departments.service";

describe('Departments Service', () => {
    let departmentsService: DepartmentsService;
    let linksService: LinksFactoryService;

    beforeEach(() => {
        linksService = new LinksFactoryService();
        departmentsService = new DepartmentsService(
            linksService
        );
    });

    describe('Translate Request', () => {
        it('should translate a request', () => {
            const data = {
                name: 'test'
            };
            const result = departmentsService.translateRequest(data);
            const expected = {
                name: 'test'
            };
            expect(result).toEqual(expected);
        });
    });

    describe('Translate Response', () => {
        it('should translate without links', () => {
            const raw = {
                id: 1,
                name: 'test',
                is_active: true
            };
            const permissions = [];
            const links = {};
            jest.spyOn(linksService, 'createLinks').mockReturnValueOnce(links);
            jest.spyOn(linksService, 'createCustomLinks').mockReturnValueOnce(links);
            const result = departmentsService.translateResponse(
                raw,
                permissions,
                false,
            );

            const expected = {
                id: 1,
                name: 'test',
                isActive: true,
            };
            expect(result).toBeDefined();
            expect(result).toEqual(expected);
            expect(linksService.createLinks).not.toHaveBeenCalled();
            expect(linksService.createCustomLinks).not.toHaveBeenCalled();
        });

        it('should translate with links', () => {
            const raw = {
                id: 1,
                name: 'test',
                is_active: true
            };
            const permissions = [];
            const links = {};
            jest.spyOn(linksService, 'createLinks').mockReturnValueOnce(links);
            jest.spyOn(linksService, 'createCustomLinks').mockReturnValue(links);
            const result = departmentsService.translateResponse(
                raw,
                permissions
            );

            const expected = {
                id: 1,
                name: 'test',
                isActive: true,
                links
            };
            expect(result).toBeDefined();
            expect(result).toEqual(expected);
            expect(linksService.createLinks).toHaveBeenCalled();
            expect(linksService.createCustomLinks).toHaveBeenCalled();
        });
    });

    describe('Translate Responses', () => {
        it('should translate a list for responses without pagination', () => {
            const first = {
                id: 1,
                name: 'first',
                is_active: true
            };
            const second = {
                id: 2,
                name: 'second',
                is_active: true
            };
            const third = {
                id: 3,
                name: 'third',
                is_active: false
            };
            const raw = [first, second, third];
            const permissions = [];
            const query = {};
            const links = {};
            const order = {};
            const filter = {};

            jest.spyOn(linksService, 'createLinks').mockReturnValue(links);
            jest.spyOn(linksService, 'createCustomLinks').mockReturnValue(links);
            jest.spyOn(linksService, 'createList').mockReturnValueOnce(links);
            jest.spyOn(linksService, 'createOrder').mockReturnValueOnce(order);
            jest.spyOn(linksService, 'createFilter').mockReturnValueOnce(
                filter,
            );

            const result = departmentsService.translateResponses(
                raw,
                null,
                query,
                permissions
            );

            const expected = {
                id: 1,
                name: 'first',
                isActive: true,
                links,
            };
            expect(result).toBeDefined();
            expect(result.data).toContainEqual(expected);
            expect(result.order).toEqual(order);
            expect(result.filter).toEqual(filter);
            expect(result.links).toEqual(links);
            expect(linksService.createLinks).toHaveBeenCalledTimes(3);
            expect(linksService.createCustomLinks).toHaveBeenCalledTimes(3);
        });

        it('should translate a list for responses with pagination', () => {
            const first = {
                id: 1,
                name: 'first',
                is_active: true
            };
            const second = {
                id: 2,
                name: 'second',
                is_active: true
            };
            const third = {
                id: 3,
                name: 'third',
                is_active: false
            };
            const raw = [first, second, third];
            const permissions = [];
            const query = {};
            const links = {};
            const order = {};
            const filter = {};
            const pagination = {
                page: 1,
                pages: 1,
                total: 1,
                prevPage: null,
                nextPage: null,
            };

            jest.spyOn(linksService, 'createLinks').mockReturnValue(links);
            jest.spyOn(linksService, 'createCustomLinks').mockReturnValue(links);
            jest.spyOn(linksService, 'createPagination').mockReturnValue(links);
            jest.spyOn(linksService, 'createList').mockReturnValueOnce(links);
            jest.spyOn(linksService, 'createOrder').mockReturnValueOnce(order);
            jest.spyOn(linksService, 'createFilter').mockReturnValueOnce(
                filter,
            );

            const result = departmentsService.translateResponses(
                raw,
                pagination,
                query,
                permissions
            );

            const expected = {
                id: 1,
                name: 'first',
                isActive: true,
                links,
            };
            expect(result).toBeDefined();
            expect(result.data).toContainEqual(expected);
            expect(result.pagination).toBeDefined();
            expect(result.pagination.links).toEqual(links);
            expect(result.order).toEqual(order);
            expect(result.filter).toEqual(filter);
            expect(result.links).toEqual(links);
            expect(linksService.createLinks).toHaveBeenCalledTimes(3);
            expect(linksService.createCustomLinks).toHaveBeenCalledTimes(3);
        });

        it('should translate a list for responses without links', () => {
            const first = {
                id: 1,
                name: 'first',
                is_active: true
            };
            const second = {
                id: 2,
                name: 'second',
                is_active: true
            };
            const third = {
                id: 3,
                name: 'third',
                is_active: false
            };
            const raw = [first, second, third];
            const permissions = [];
            const query = {};
            const links = {};

            jest.spyOn(linksService, 'createLinks').mockReturnValue(links);
            jest.spyOn(linksService, 'createCustomLinks').mockReturnValue(links);
            jest.spyOn(linksService, 'createPagination').mockReturnValue(links);
            jest.spyOn(linksService, 'createList').mockReturnValueOnce(links);

            const result = departmentsService.translateResponses(
                raw,
                null,
                query,
                permissions,
                false
            );

            const expected = {
                id: 1,
                name: 'first',
                isActive: true
            };
            expect(result).toBeDefined();
            expect(result.data).toContainEqual(expected);
            expect(linksService.createLinks).not.toHaveBeenCalled();
            expect(linksService.createCustomLinks).not.toHaveBeenCalled();
        });
    });

});
