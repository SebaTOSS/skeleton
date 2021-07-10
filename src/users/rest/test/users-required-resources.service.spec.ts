/* eslint-disable @typescript-eslint/camelcase */
import createMockInstance from 'jest-create-mock-instance';
import { LanguagesService } from '../../languages/languages.service';
import {LinksFactoryService, ResourcesDTO} from '../../core';
import {LanguagesResolverService} from '../../sdk';
import { UsersRequiredResourcesService } from '../users-required-resources.service';
import { LanguageDTO } from '../../dtos';

describe('Users Required Resources Service', () => {
    let service: UsersRequiredResourcesService;
    let linkService: LinksFactoryService;
    let languagesResolverService: LanguagesResolverService;
    let languagesService: LanguagesService;

    beforeEach(() => {
        languagesResolverService = createMockInstance(LanguagesResolverService);
        linkService = new LinksFactoryService();
        languagesService = new LanguagesService(linkService);
        service = new UsersRequiredResourcesService(
            languagesResolverService,
            languagesService
        );
    });

    it('should get additional resources', async () => {
        const reqId = 1;
        const header = {};
        const params = [reqId, header];
        const resolved = {
            data:[{
                name: 'es',
                is_active: true
            }]
        };
        const resources = new ResourcesDTO(LanguageDTO);
        const resource = new LanguageDTO();
        resource.name = 'es';
        resource.isActive = true;
        resources.data =  [resource];
        jest.spyOn(languagesResolverService, 'getAll').mockResolvedValueOnce(resolved);
        jest.spyOn(languagesService, 'translateResponses').mockReturnValueOnce(resources);;

        const expected = {
            languages:
            [{
                name: 'es',
                isActive: true
            }]
        }

        const result = await service.getAdditionalResources(null, params);
        expect(result).toBeDefined();
        expect(result).toEqual(expected);
    });

    it('should get additional resources filter', async () => {
        const reqId = 1;
        const header = {};
        const params = [reqId, header];
        const resolved = {
            data:[{
                name: 'es',
                is_active: true
            }]
        };
        const resources = new ResourcesDTO(LanguageDTO);
        const resource = new LanguageDTO();
        resource.name = 'es';
        resource.isActive = true;
        resources.data =  [resource];
        jest.spyOn(languagesResolverService, 'getAll').mockResolvedValueOnce(resolved);
        jest.spyOn(languagesService, 'translateResponses').mockReturnValueOnce(resources);;

        const expected = {
            languages:
            [{
                name: 'es',
                isActive: true
            }]
        }

        const result = await service.getAdditionalResourcesFilter(null, params);
        expect(result).toBeDefined();
        expect(result).toEqual(expected);
    });
});
