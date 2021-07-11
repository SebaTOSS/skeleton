import { Injectable } from "@nestjs/common";
import {
  AbstractLinkService,
  DictionaryResourcesService,
  LinkFactory,
  LinksUtilsService,
  MethodHttp,
  PaginationService,
} from "../../core";
import { UserDTO } from "./../dtos/user.dto";
import ConfigService from "./../../config/config.service";
import CONSTANTS from "./../constants";

@Injectable()
@LinkFactory([UserDTO])
export class UserLinksService extends AbstractLinkService {
  constructor(
    readonly linksUtils: LinksUtilsService,
    readonly paginationService: PaginationService,
    readonly dictionaryService: DictionaryResourcesService,
    readonly configService: ConfigService
  ) {
    super(linksUtils, paginationService, configService);
  }

  GET = "users.get";
  PUT = "users.put";
  POST = "users.post";
  PATCH = "users.patch";
  DELETE = "users.delete";
  FILTER = "users.filter";
  filterFields = {};
  segments: Array<string> = ["users"];

  getLinks(user: any, permissions: Array<any>): object {
    const { id } = user;

    return {
      self: {
        id,
        read: this.checkPermissionsUrl(
          MethodHttp.GET,
          this.SELF,
          this.url(user),
          CONSTANTS.PERMISSIONS.READ,
          permissions
        ),
        update: this.checkPermissionsUrl(
          MethodHttp.PUT,
          this.PUT,
          this.url(user),
          CONSTANTS.PERMISSIONS.UPDATE,
          permissions
        ),
        delete: this.checkPermissionsUrl(
          MethodHttp.DELETE,
          this.DELETE,
          this.url(user),
          CONSTANTS.PERMISSIONS.UPDATE,
          permissions
        ),
        parent: this.checkPermissionsUrl(
          MethodHttp.GET,
          this.PARENT,
          this.parentUrl(user),
          CONSTANTS.PERMISSIONS.READ,
          permissions
        ),
        init: this.linksUtils.createLink(
          MethodHttp.GET,
          this.INIT,
          this.getRequiredResourcesUrl({
            schema: this.dictionaryService.getSchema(UserDTO),
          })
        ),
      },
    };
  }

  getListLinks(user: any, permissions: Array<any>): object {
    return {
      self: {
        read: this.checkPermissionsUrl(
          MethodHttp.GET,
          this.SELF,
          this.parentUrl(user),
          CONSTANTS.PERMISSIONS.READ,
          permissions
        ),
        create: this.checkPermissionsUrl(
          MethodHttp.POST,
          this.POST,
          this.parentUrl(user),
          CONSTANTS.PERMISSIONS.CREATE,
          permissions
        ),
        init: this.linksUtils.createLink(
          MethodHttp.GET,
          this.INIT,
          this.getRequiredResourcesUrl({
            schema: this.dictionaryService.getSchema(UserDTO),
          })
        ),
      },
    };
  }

  getOrderLinks(): object {
    return {};
  }
}
