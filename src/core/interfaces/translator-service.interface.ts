import { LinksFactoryService } from '..';
import { ResourceDTO, ResourcesDTO } from '../dtos';

export interface TranslatorService {
    linksService: LinksFactoryService;
    translateRequest(object: any): any;
    translateResponse(
        object: any,
        permissions: Array<any>,
        shouldCreateLinks?: boolean,
        metadata?: any,
    ): ResourceDTO;
    translateResponses(
        objects: Array<any>,
        pagination: any,
        query: any,
        permissions: Array<any>,
        shouldCreateLinks?: boolean,
        metadata?: any,
    ): ResourcesDTO<ResourceDTO>;
}
