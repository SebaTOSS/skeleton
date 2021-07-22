import { Injectable } from "@nestjs/common";
import {
  AbstractLinkService,
  DictionaryResourcesService,
  LinkFactory,
  LinksUtilsService,
  MethodHttp,
  PaginationService,
} from "../../core";
import { RoleDTO } from "./../dtos/role.dto";
import ConfigService from "../../config/config.service";
import CONSTANTS from "../constants";

@Injectable()
@LinkFactory([RoleDTO])
export class RolesLinksService extends AbstractLinkService {
  constructor(
    readonly linksUtils: LinksUtilsService,
    readonly paginationService: PaginationService,
    readonly dictionaryService: DictionaryResourcesService,
    readonly configService: ConfigService
  ) {
    super(linksUtils, paginationService, configService);
  }

  GET = "roles.get";
  PUT = "roles.put";
  POST = "roles.post";
  PATCH = "roles.patch";
  DELETE = "roles.delete";
  FILTER = "roles.filter";
  filterFields = {};
  segments: Array<string> = ["roles"];

  getLinks(role: any, permissions: Array<any>): object {
    const { id } = role;

    return {
      self: {
        id,
        read: this.checkPermissionsUrl(
          MethodHttp.GET,
          this.SELF,
          this.url(role),
          CONSTANTS.PERMISSIONS.READ,
          permissions
        ),
        update: this.checkPermissionsUrl(
          MethodHttp.PUT,
          this.PUT,
          this.url(role),
          CONSTANTS.PERMISSIONS.UPDATE,
          permissions
        ),
        delete: this.checkPermissionsUrl(
          MethodHttp.DELETE,
          this.DELETE,
          this.url(role),
          CONSTANTS.PERMISSIONS.UPDATE,
          permissions
        ),
        parent: this.checkPermissionsUrl(
          MethodHttp.GET,
          this.PARENT,
          this.parentUrl(role),
          CONSTANTS.PERMISSIONS.READ,
          permissions
        ),
        init: this.linksUtils.createLink(
          MethodHttp.GET,
          this.INIT,
          this.getRequiredResourcesUrl({
            schema: this.dictionaryService.getSchema(RoleDTO),
          })
        ),
      },
    };
  }

  getListLinks(role: any, permissions: Array<any>): object {
    return {
      self: {
        read: this.checkPermissionsUrl(
          MethodHttp.GET,
          this.SELF,
          this.parentUrl(role),
          CONSTANTS.PERMISSIONS.READ,
          permissions
        ),
        create: this.checkPermissionsUrl(
          MethodHttp.POST,
          this.POST,
          this.parentUrl(role),
          CONSTANTS.PERMISSIONS.CREATE,
          permissions
        ),
        init: this.linksUtils.createLink(
          MethodHttp.GET,
          this.INIT,
          this.getRequiredResourcesUrl({
            schema: this.dictionaryService.getSchema(RoleDTO),
          })
        ),
      },
    };
  }

  getOrderLinks(): object {
    return {};
  }
}
