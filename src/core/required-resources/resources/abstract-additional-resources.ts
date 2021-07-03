import { ResourceDTO } from '../../dtos';
import { AdditionalResources } from './additional-resources.interface';

export abstract class AbstractAdditionalResources
    implements AdditionalResources {
    abstract getAdditionalResources(resource?: ResourceDTO, ...params: any);
    abstract getAdditionalResourcesFilter(
        resource: ResourceDTO,
        ...params: any
    );
}
