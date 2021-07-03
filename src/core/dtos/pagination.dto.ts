import { ResourceDTO } from './resource.dto';

export class PaginationDTO<T> extends ResourceDTO {
    constructor(type: new () => T) {
        super();
        this.type = type;
    }

    type: any;
    page: number;
    pages: number;
    total: number;
    prePage: number;
    prevPage: number;
    perPage: number;
    nextPage: number;
    query: any;

    cleanUp() {
        delete this.metadata;
        delete this.query;
        delete this.type;
    }
}
