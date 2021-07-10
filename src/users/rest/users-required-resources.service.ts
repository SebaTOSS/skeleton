import { Injectable } from '@nestjs/common';
import {
    AbstractAdditionalResources,
    RequiredResources,
    ResourceDTO,
} from '../../core';
import { UserDTO } from './../dtos/user.dto';
@Injectable()
@RequiredResources([UserDTO], 'users')
export class UsersRequiredResourcesService extends AbstractAdditionalResources {

    async getAdditionalResources(resource: ResourceDTO, ...params) {
        return this.getResources(...params);
    }

    async getAdditionalResourcesFilter(resource: ResourceDTO, ...params) {
        return this.getResources(...params);
    }

    async getResources(...params) {
        return {
            languages: {}
        }
    }
}
