/* eslint-disable @typescript-eslint/camelcase */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  DefaultOrderPipe,
  DefaultPaginationPipe,
  SchemaValidationPipe,
  TranslateOrderPipe,
} from "../commons";
import { ResponseService } from "../core";
import { PermissionGuard, Permissions } from "../core/security";
import { DepartmentDTO } from "./dtos";
import { LoggerInterceptor } from "../interceptors";
import CONSTANTS from "./constants";
import { DepartmentsService } from "./departments.service";
import SCHEMAS from "./schemas";

@UseGuards(PermissionGuard)
@UseInterceptors(LoggerInterceptor)
@ApiTags("Departments")
@Controller("/departments")
export class DepartmentsController {
  constructor(
    private readonly translatorService: DepartmentsService,
    private readonly responseService: ResponseService
  ) {}

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "List of departments",
  })
  @ApiOperation({
    summary: "Gets a list of departments",
  })
  @ApiQuery({
    name: "order",
    required: false,
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Permissions(CONSTANTS.PERMISSIONS.READ)
  @UsePipes(
    new DefaultPaginationPipe(),
    new DefaultOrderPipe(CONSTANTS.DEFAULT_ORDER),
    new TranslateOrderPipe(CONSTANTS.TRANSLATION_KEYS)
  )
  async getAll(@Query() query) {
    return this.responseService.getSuccess();
  }

  @Get(":id")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "Gets one department",
  })
  @ApiOperation({
    summary: "Gets one department",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: Number,
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Permissions(CONSTANTS.PERMISSIONS.READ)
  async getOne(@Param("id") id) {
    return this.responseService.getSuccess();
  }

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: "Creates a new department",
  })
  @ApiOperation({
    summary: "Creates a new department",
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Permissions(CONSTANTS.PERMISSIONS.CREATE)
  @UsePipes(new SchemaValidationPipe(SCHEMAS.post))
  async create(@Body() element: DepartmentDTO) {
    return this.responseService.getSuccess();
  }

  @Put(":id")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "Update a department",
  })
  @ApiOperation({
    summary: "Update department",
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Permissions(CONSTANTS.PERMISSIONS.UPDATE)
  @UsePipes(new SchemaValidationPipe(SCHEMAS.put))
  async update(@Param("id") id, @Body() element: DepartmentDTO) {
    return this.responseService.getSuccess();
  }

  @Patch(":id")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "Partial update a department",
  })
  @ApiOperation({
    summary: "Partial update a department",
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Permissions(CONSTANTS.PERMISSIONS.UPDATE)
  @UsePipes(new SchemaValidationPipe(SCHEMAS.patch))
  async patch(@Param("id") id, @Body() element: DepartmentDTO) {
    return this.responseService.getSuccess();
  }

  @Delete(":id")
  @HttpCode(204)
  @ApiResponse({
    status: 201,
    description: "Delete a department",
  })
  @ApiOperation({
    summary: "Delete department",
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Permissions(CONSTANTS.PERMISSIONS.DELETE)
  async delete(@Param("id") id) {
    return this.responseService.getSuccess();
  }
}
