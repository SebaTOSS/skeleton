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
import { CreateUserDTO, UserDTO } from "../dtos";
import CONSTANTS from "../constants";
import { LinkGeneratorInterceptor } from "../../interceptors/hateoas/link.generator.interceptor";
import { UsersService } from "../model/users.service";
import SCHEMAS from "./schemas";

@UseGuards(PermissionGuard)
@UseInterceptors(LoggerInterceptor, LinkGeneratorInterceptor)
@ApiTags("Users")
@Controller("/users")
export class UsersController {
  constructor(
    readonly usersService: UsersService,
    readonly responseService: ResponseService
  ) {}

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "List of users",
  })
  @ApiOperation({
    summary: "Gets a list of users",
  })
  @ApiQuery({
    name: "firstName",
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
    const users = await this.usersService.findAll(query);

    return this.responseService.getSuccess(users);
  }

  @Get(":id")
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "Gets one user",
  })
  @ApiOperation({
    summary: "Gets one user",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: Number,
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Permissions(CONSTANTS.PERMISSIONS.READ)
  async findOne(@Param("id") id): Promise<ResponseDTO> {
    const user: UserDTO = await this.usersService.findOne(id);

    return this.responseService.getSuccess(user);
  }

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: "Creates a new user",
  })
  @ApiOperation({
    summary: "Creates a new user",
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Permissions(CONSTANTS.PERMISSIONS.CREATE)
  @UsePipes(new SchemaValidationPipe(SCHEMAS.post))
  async create(@Body() createUserDTO: CreateUserDTO): Promise<ResponseDTO> {
    const user: UserDTO = await this.usersService.create(createUserDTO);

    return this.responseService.getSuccess(user);
  }

  @Delete(":id")
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: "Deletes a user",
  })
  @ApiOperation({
    summary: "Deletes a user",
  })
  @ApiParam({
    name: "id",
    required: true,
    type: Number,
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Permissions(CONSTANTS.PERMISSIONS.DELETE)
  async delete(@Param("id") id): Promise<ResponseDTO> {
    await this.usersService.delete(id);

    return this.responseService.getSuccess();
  }
}
