import { ResourceDTO } from '../../dtos';

export interface Links {
    SELF: string;
    INIT: string;
    PARENT: string;
    GET: string;
    PUT: string;
    POST: string;
    PATCH: string;
    DELETE: string;
    readonly baseUrl: string;
    getLinks(resource: ResourceDTO, permission: Array<any>): object;
    getListLinks(resource: ResourceDTO, permissions: Array<any>): object;
    getPaginationLinks(resource: ResourceDTO): object;
    getOrderLinks(resource: ResourceDTO): object;
    getFilterLinks(additionalResources?: any): object;
    url(resource: ResourceDTO): string;
    parentUrl(resource?: ResourceDTO): string;
    customLinks(resource: ResourceDTO, permission: Array<any>): object;
}
