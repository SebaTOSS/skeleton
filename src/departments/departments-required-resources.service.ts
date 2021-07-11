import { Injectable } from "@nestjs/common";
import { AbstractAdditionalResources, RequiredResources } from "../core";
import { DepartmentDTO } from "./dtos";

@Injectable()
@RequiredResources([DepartmentDTO], "departments")
export class DepartmentsRequiredResourcesService extends AbstractAdditionalResources {
  // the constructor should import the resolver required, it does not import eeConnector service
  constructor() {
    super();
  }

  async getAdditionalResources() {
    return {};
  }

  getAdditionalResourcesFilter() {
    return;
  }
}
