import { Injectable } from "@nestjs/common";
import {
  AbstractLinkService,
  DictionaryResourcesService,
  LinkFactory,
  LinksUtilsService,
  MethodHttp,
  PaginationService,
  ResourceDTO,
} from "../core";
import { DepartmentDTO } from "./dtos";
import ConfigService from "./../config/config.service";
import CONSTANTS from "./constants";

@Injectable()
@LinkFactory([DepartmentDTO])
export class DepartmentLinksService extends AbstractLinkService {
  constructor(
    readonly linksUtils: LinksUtilsService,
    readonly paginationService: PaginationService,
    readonly dictionaryService: DictionaryResourcesService,
    readonly configService: ConfigService
  ) {
    super(linksUtils, paginationService, configService);
  }

  GET = "departments.get";
  PUT = "departments.put";
  POST = "departments.post";
  PATCH = "departments.patch";
  DELETE = "departments.delete";
  segments: Array<string> = ["departments"];

  getEntityName(): string {
    return "departments";
  }

  getLinks(department: ResourceDTO, permission: Array<any>): object {
    const { id } = department;

    return {
      self: {
        id,
        read: this.checkPermissionsUrl(
          MethodHttp.GET,
          this.SELF,
          this.url(department),
          CONSTANTS.PERMISSIONS.READ,
          permission
        ),
        parent: this.checkPermissionsUrl(
          MethodHttp.GET,
          this.PARENT,
          this.parentUrl(),
          CONSTANTS.PERMISSIONS.READ,
          permission
        ),
        init: this.linksUtils.createLink(
          MethodHttp.GET,
          this.INIT,
          this.getRequiredResourcesUrl({
            schema: this.dictionaryService.getSchema(DepartmentDTO),
          })
        ),
      },
    };
  }

  getListLinks(): object {
    return {};
  }

  getOrderLinks(departments: any): object {
    const { query } = departments;
    const [order] = this.omitOrder(query);

    return {
      orderedBy: this.getOrderedBy(order),
      id: {
        asc: this.linksUtils.createLink(
          MethodHttp.GET,
          this.GET,
          this.getAscendingUrl("id")
        ),
        desc: this.linksUtils.createLink(
          MethodHttp.GET,
          this.GET,
          this.getDescendingUrl("id")
        ),
      },
      name: {
        asc: this.linksUtils.createLink(
          MethodHttp.GET,
          this.GET,
          this.getAscendingUrl("name")
        ),
        desc: this.linksUtils.createLink(
          MethodHttp.GET,
          this.GET,
          this.getDescendingUrl("name")
        ),
      },
    };
  }

  getFilterLinks(): object {
    return;
  }

  getTemplate(permissions: any[]): object {
    const [departments] = this.segments;
    const base = `${this.baseUrl}/${departments}`;
    const entity = `${this.baseUrl}/${departments}/:departmentId`;

    return {
      department: {
        read: this.checkPermissionsUrl(
          MethodHttp.GET,
          this.SELF,
          entity,
          CONSTANTS.PERMISSIONS.READ,
          permissions
        ),
      },
      departments: {
        read: this.checkPermissionsUrl(
          MethodHttp.GET,
          this.SELF,
          base,
          CONSTANTS.PERMISSIONS.READ,
          permissions
        ),
      },
    };
  }
}
