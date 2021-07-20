/* eslint-disable @typescript-eslint/no-unused-vars */
import * as _ from "lodash";
import ConfigService from "../../../config/config.service";
import { UtilsService } from "../../../utils";
import { PaginationDTO, ResourceDTO } from "../../dtos";
import { PaginationService } from "../../services/pagination.service";
import { LinksUtilsService } from "../links-utils.service";
import { MethodHttp } from "../method-http.enum";
import { Links } from "./links.interfaces";

export abstract class AbstractLinkService implements Links {
  constructor(
    readonly linksUtils: LinksUtilsService,
    readonly paginationService: PaginationService,
    readonly configService: ConfigService
  ) {
    this.baseUrl = this.configService.get("configurations.api.url");
  }

  SELF = "self";
  INIT = "init";
  PARENT = "parent";
  FILTER = "filter";
  GET: string;
  PUT: string;
  POST: string;
  PATCH: string;
  DELETE: string;
  segments: Array<string>;
  filterFields: object;
  baseUrl: string;

  abstract getLinks(resource: ResourceDTO, permission: any[]): object;

  abstract getListLinks(resource: ResourceDTO, permissions: any[]): object;

  abstract getOrderLinks(resource: ResourceDTO): object;

  getEntityName(): string {
    return "";
  }

  getTemplate(permissions: any[]): object {
    return {};
  }

  shouldAppearInMenu() {
    return false;
  }

  addTemplate(result: any, permissions: any[]) {
    const template = this.getTemplate(permissions);
    const entity = this.getEntityName();
    const shouldAddTemplate = template[entity] && template[entity].read;
    if (shouldAddTemplate) {
      Object.keys(template).forEach((name) => {
        result.templates[name] = template[name];
      });
    }
    const shouldAddToRoot =
      shouldAddTemplate &&
      this.shouldAppearInMenu() &&
      result.root.indexOf(entity) === -1;
    if (shouldAddToRoot) {
      result.root.push(entity);
    }
  }

  getFilterLinks(resource?: any): object {
    const fields = this.filterFields;
    const url = this.getFilterBaseUrl(resource);
    const query = this.linksUtils.createLink(MethodHttp.GET, this.FILTER, url);

    return {
      fields,
      query,
    };
  }

  getFilterBaseUrl(resource: ResourceDTO): any {
    return `${this.baseUrl}/${this.segments}/?`;
  }

  getUrlPagination(resource: ResourceDTO): any {
    return this.segments;
  }

  getPaginationLinks(pagination: PaginationDTO<any>): object {
    const { prevPage, page, nextPage, perPage, query } = pagination;

    return this.paginationService.getLinks(
      this.baseUrl,
      this.getUrlPagination(pagination),
      prevPage,
      page,
      nextPage,
      perPage,
      query
    );
  }

  url(resource: ResourceDTO): string {
    const { id } = resource;
    return `${this.baseUrl}/${this.segments}/${id}`;
  }

  parentUrl(resource?: ResourceDTO): string {
    return `${this.baseUrl}/${this.segments}`;
  }

  checkPermissionsUrl(
    method: string,
    rel: string,
    url: string,
    permission: any,
    permissions: Array<any>,
    flag = true
  ) {
    const link = this.linksUtils.createLink(method, rel, url);

    return this.linksUtils.hasPermission(permission, permissions, link, flag);
  }

  getOrderedBy(ordered: string) {
    if (ordered) {
      const keys = ordered.split(",");

      return {
        field: keys[0],
        order: keys[1],
      };
    }

    return;
  }

  omitOrder(query: any) {
    const { order } = query;
    const filterQuery = _.omit(query, "order");

    return [order, filterQuery];
  }

  getAscendingUrl(key: string, metadata?: any) {
    return `${this.baseUrl}/${this.segments}?order=${key},asc`;
  }

  getDescendingUrl(key: string, metadata?: any) {
    return `${this.baseUrl}/${this.segments}?order=${key},desc`;
  }

  getRequiredResourcesUrl(query) {
    return `${this.baseUrl}/required-resources?${UtilsService.serialize(
      query
    )}`;
  }

  customLinks(resource: ResourceDTO, permission: Array<any>): any {
    return;
  }
}
