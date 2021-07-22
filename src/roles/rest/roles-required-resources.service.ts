/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import {
  AbstractAdditionalResources,
  RequiredResources,
  ResourceDTO,
} from "../../core";
import { RoleDTO } from "./../dtos/role.dto";

@Injectable()
@RequiredResources([RoleDTO], "roles")
export class RolesRequiredResourcesService extends AbstractAdditionalResources {
  async getAdditionalResources(resource: ResourceDTO, ...params) {
    return this.getResources(...params);
  }

  async getAdditionalResourcesFilter(resource: ResourceDTO, ...params) {
    return this.getResources(...params);
  }

  async getResources(...params) {
    return {
      languages: {},
    };
  }
}
