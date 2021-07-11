/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import {
  LinksFactoryService,
  ResourcesDTO,
  ResourcesFactory,
  TranslatorService,
} from "../core";
import { DepartmentDTO } from "./dtos";

@Injectable()
export class DepartmentsService implements TranslatorService {
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

  translateResponse(
    dto: any,
    permissions: any[],
    shouldCreateLinks = true
  ): DepartmentDTO {
    const { id, name, is_active: isActive } = dto;
    const translated: DepartmentDTO = new DepartmentDTO();

    translated.id = id;
    translated.name = name;
    translated.isActive = isActive;

    return translated;
  }

  translateResponses(
    raw: Array<any>,
    pagination: any,
    query: any,
    permissions: Array<any>,
    shouldCreateLinks = true
  ): ResourcesDTO<DepartmentDTO> {
    const translated = ResourcesFactory.create<DepartmentDTO>(
      DepartmentDTO,
      raw,
      query,
      pagination,
      permissions,
      this,
      shouldCreateLinks
    );

    return translated;
  }
}
