/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { LinksFactoryService, ResourcesDTO, ResourcesFactory } from "../core";
import { DepartmentDTO } from "./dtos";

@Injectable()
export class DepartmentsService {
  readonly linksService: LinksFactoryService;

  constructor(linksService: LinksFactoryService) {
    this.linksService = linksService;
  }

  translateRequest(dto: any): any {
    const { id, name } = dto;

    return {
      id,
      name,
    };
  }
}
