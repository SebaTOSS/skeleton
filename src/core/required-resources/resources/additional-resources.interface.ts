import { ResourceDTO } from '../../dtos';

export interface AdditionalResources {
    getAdditionalResources(resource: ResourceDTO, ...params: any): any;
}
