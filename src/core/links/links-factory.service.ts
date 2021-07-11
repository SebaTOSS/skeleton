import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import * as _ from "lodash";
import { UtilsService } from "../../utils";
import ConfigService from "../../config/config.service";
import { PaginationDTO, ResourceDTO, ResourcesDTO } from "../dtos";
import CONSTANTS from "./constants";
import { Links } from "./index";

@Injectable()
export class LinksFactoryService implements OnModuleInit {
  @Inject()
  private readonly moduleRef: ModuleRef;

  @Inject()
  private readonly configService: ConfigService;

  private readonly services: any = {};

  private linksToRemove: Array<any> = [];

  onModuleInit() {
    const value = this.configService.get("configurations.removeActionLinks");
    this.linksToRemove = value ? value : [];
  }

  /**
   * Creates and set links into the resource using permissions to check
   * witch link should be added.
   * @param resource any subclass of ResourceDTO
   * @param permissions the list of permissions
   */
  set(resource: ResourceDTO, permissions: Array<any>) {
    // Creates links for the container resource
    resource.createLinks(this, permissions);

    // Creates links for each field that is a resource
    Object.values(resource)
      .filter((field) => {
        const isResource = field instanceof ResourceDTO;
        const isArray = field instanceof Array;
        const isArrayOfResources = isArray
          ? field[0] instanceof ResourceDTO
          : false;
        return isResource || isArrayOfResources;
      })
      .map((field) => {
        const isArray = field instanceof Array;
        if (isArray) {
          field.forEach((element: ResourceDTO) => {
            // Recursive call to set links to inner resources
            this.set(element, permissions);
          });
        } else {
          // Set links to a single resource
          field.createLinks(this, permissions);
        }
      });
  }

  getService(name: string): any {
    const service: Links = this.services[name];

    return service;
  }

  createLinks(resource: ResourceDTO, permissions: Array<any>): object {
    const { name } = resource.constructor;
    const service: Links = this.getService(name);

    return service.getLinks(resource, permissions);
  }

  createList(resource: ResourcesDTO<any>, permissions: Array<any>): object {
    const { name } = resource.type;
    const service: Links = this.getService(name);

    return service.getListLinks(resource, permissions);
  }

  createOrder(resource: ResourcesDTO<any>): object {
    const { name } = resource.type;
    const service: Links = this.getService(name);

    return service.getOrderLinks(resource);
  }

  createFilter(resource: ResourcesDTO<any>): object {
    const { name } = resource.type;
    const service: Links = this.getService(name);

    return service.getFilterLinks(resource);
  }

  createPagination(resource: PaginationDTO<ResourceDTO>): object {
    const { name } = resource.type;
    const service: Links = this.getService(name);

    return service.getPaginationLinks(resource);
  }

  register(services: Array<any>) {
    services.forEach((service) => {
      const dispatcher = this.moduleRef.get(service.name, {
        strict: false,
      });
      const resolvers = Reflect.getMetadata(CONSTANTS.LINK_FACTORY, service);
      resolvers.forEach((element) => {
        this.services[element.name] = dispatcher;
      });
    });
  }

  createDependencyLinks<Resource>(
    dto: new () => Resource,
    permissions: Array<any>,
    metadata?: any
  ) {
    const linksService = this.getService(dto.name);
    dto["metadata"] = metadata;
    const { self: links } = linksService.getListLinks(dto, permissions);

    const isInitOnly = UtilsService.checkIfInitOnly(links);
    const isNotEmpty = !_.isEmpty(links);
    const hasLinks = _.some(_.values(links), (value) => !_.isUndefined(value));

    return !isInitOnly && isNotEmpty && hasLinks ? links : undefined;
  }

  createCustomLinks(resource: ResourceDTO, permissions: Array<any>): object {
    const { name } = resource.constructor;
    const service: Links = this.getService(name);

    return service.customLinks(resource, permissions);
  }

  getToRemove(resource: ResourceDTO) {
    const name = resource.constructor.name;
    const value = this.linksToRemove.find(({ entity }) => entity === name);

    return value ? value.links : [];
  }

  getUrlTemplates(permissions: any[]): any {
    const result = {
      templates: {},
      root: [],
    };
    const linkServices = Object.values(this.services);
    linkServices.forEach((service: any) => {
      service.addTemplate(result, permissions);
    });

    return result;
  }
}
