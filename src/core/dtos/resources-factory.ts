import { TranslatorService } from '../interfaces';
import { PaginationService } from '../services';
import { PaginationDTO } from './pagination.dto';
import { ResourcesDTO } from './resources.dto';

export class ResourcesFactory {
    static create<T>(
        type: new () => T,
        raw: Array<any>,
        query: any,
        pagination: any,
        permissions: Array<any> = [],
        service: TranslatorService,
        shouldCreateLinks = true,
        metadata?: any,
    ): ResourcesDTO<T> {
        const reducer = (array: any[], item: any) =>
            array.concat(
                service.translateResponse(item, permissions, shouldCreateLinks, metadata),
            );
        const items = raw.reduce(reducer, []);
        const translated = new ResourcesDTO(type);
        translated.metadata = metadata;

        if (pagination) {
            const paginationDTO = new PaginationDTO(type);
            paginationDTO.metadata = metadata;
            translated.pagination = PaginationService.translate(
                pagination,
                paginationDTO,
                query,
            );
        }

        translated.data = items;
        translated.query = query;

        if (shouldCreateLinks) {
            translated.createLinks(service.linksService, permissions);
        } else {
            translated.cleanUp();
        }

        return translated;
    }
}
