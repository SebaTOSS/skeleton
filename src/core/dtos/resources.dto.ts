import { PaginationDTO } from './pagination.dto';
import { ResourceDTO } from './resource.dto';

export class ResourcesDTO<T> extends ResourceDTO {
    constructor(type: new () => T) {
        super();
        this.type = type;
    }

    type: any;
    data: Array<T>;
    order: any;
    filter: any;
    query: any;
    pagination: PaginationDTO<ResourcesDTO<ResourceDTO>>;

    createLinks(linksService: any, permissions: Array<any>): object {
        this.links = linksService.createList(this, permissions);
        if (this.pagination) {
            this.pagination.links = linksService.createPagination(
                this.pagination,
            );
            this.pagination.cleanUp();
        }
        this.order = linksService.createOrder(this);
        this.filter = linksService.createFilter(this);
        // Removes types for not expose to client

        this.cleanUp();

        return this.links;
    }

    setAdditionalResourcesToFilter(additionalResources: any) {
        this.filter = {
            ...this.filter,
            additionalResources,
        };
        return this.filter;
    }

    cleanUp(){
        super.cleanUp();
        delete this.query;
        if (this.pagination) {
            delete this.pagination.metadata;
            delete this.pagination.type;
        }
    }
}
