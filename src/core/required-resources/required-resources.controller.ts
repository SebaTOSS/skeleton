/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  HttpCode,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { LoggerInterceptor, RequestId } from "../../interceptors";
import { PermissionGuard, Permissions } from "../security";
import { ResponseService } from "../services";
import { RequiredResourcesFactoryService } from "./required-resources-factory.service";
import CONSTANTS from "./constants";

@UseGuards(PermissionGuard)
@UseInterceptors(LoggerInterceptor)
@Controller("/required-resources")
@ApiTags("Required Resources")
export class RequiredResourcesController {
  constructor(
    private readonly requiredResourcesService: RequiredResourcesFactoryService,
    private readonly responseService: ResponseService
  ) {}

  @Get()
  @HttpCode(200)
  @Permissions(CONSTANTS.PERMISSIONS.READ)
  @ApiQuery({
    name: "schema",
    required: true,
  })
  async get(@RequestId() reqId, @Query() query) {
    const { schema } = query;
    const data = {
      additionalResources: await this.requiredResourcesService.createAdditionalResourcesBySchema(
        schema,
        reqId,
        query
      ),
    };

    return this.responseService.getSuccess();
  }
}
