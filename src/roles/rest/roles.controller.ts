import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
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
  TranslateOrderPipe,
  SchemaValidationPipe,
} from "../../commons";
import { ResponseDTO, ResponseService } from "../../core";
import { PermissionGuard, Permissions } from "../../core/security";
import { LoggerInterceptor } from "../../interceptors";
import { CreateRoleDTO, RoleDTO } from "../dtos";
import CONSTANTS from "../constants";
import { LinkGeneratorInterceptor } from "../../interceptors/hateoas/link.generator.interceptor";
import { RolesService } from "../model/roles.service";
import SCHEMAS from "./schemas";

@UseGuards(PermissionGuard)
@UseInterceptors(LoggerInterceptor, LinkGeneratorInterceptor)
@ApiTags("Roles")
@Controller("/roles")
export class RolesController {
  constructor(
    readonly service: RolesService,
    readonly responseService: ResponseService
  ) {}

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "List of roles",
  })
  @ApiOperation({
    summary: "Gets a list of roles",
  })
  @ApiQuery({
    name: "name",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: "order",
    required: false,
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: "perPage",
    required: false,
    type: Number,
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Permissions(CONSTANTS.PERMISSIONS.READ)
  @UsePipes(
    new DefaultPaginationPipe(),
    new DefaultOrderPipe(CONSTANTS.DEFAULT_ORDER),
    new TranslateOrderPipe(CONSTANTS.TRANSLATION_KEYS)
  )
  async find(@Query() query): Promise<ResponseDTO> {
    const users = await this.service.findAll(query);

    return this.responseService.getSuccess(users);
  }

  @Get(":id")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "Gets one role",
  })
  @ApiOperation({
    summary: "Gets one role",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: Number,
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Permissions(CONSTANTS.PERMISSIONS.READ)
  async findOne(@Param("id") id): Promise<ResponseDTO> {
    const role: RoleDTO = await this.service.findOne(id);

    return this.responseService.getSuccess(role);
  }

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: "Creates a new role",
  })
  @ApiOperation({
    summary: "Creates a new role",
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Permissions(CONSTANTS.PERMISSIONS.CREATE)
  @UsePipes(new SchemaValidationPipe(SCHEMAS.post))
  async create(@Body() createRoleDTO: CreateRoleDTO): Promise<ResponseDTO> {
    const role: RoleDTO = await this.service.create(createRoleDTO);

    return this.responseService.getSuccess(role);
  }

  @Delete(":id")
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: "Deletes a role",
  })
  @ApiOperation({
    summary: "Deletes a role",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: Number,
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Permissions(CONSTANTS.PERMISSIONS.DELETE)
  async delete(@Param("id") id): Promise<ResponseDTO> {
    await this.service.delete(id);

    return this.responseService.getSuccess();
  }
}
