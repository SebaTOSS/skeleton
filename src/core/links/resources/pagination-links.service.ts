/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import ConfigService from "../../../config/config.service";
import { PaginationService } from "../../services";
import { ResourceDTO } from "../../dtos";
import { PaginationDTO } from "../../dtos/pagination.dto";
import { AbstractLinkService } from "./abstract-links.service";
import { LinkFactory, LinksUtilsService } from "..";

@Injectable()
@LinkFactory([PaginationDTO])
export class PaginationLinksService extends AbstractLinkService {
  constructor(
    readonly linksUtils: LinksUtilsService,
    readonly paginationService: PaginationService,
    readonly configService: ConfigService
  ) {
    super(linksUtils, paginationService, configService);
  }

  getListLinks(resource: ResourceDTO, permissions: any[]): object {
    throw new Error("Method not implemented.");
  }

  getOrderLinks(resource: ResourceDTO): object {
    throw new Error("Method not implemented.");
  }

  getLinks(resource: any, permission: any[]): object {
    return resource.links;
  }
}
