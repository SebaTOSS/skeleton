import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query, Session, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { ApiForbiddenResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DefaultOrderPipe, DefaultPaginationPipe, TranslateOrderPipe } from "../../commons";
import { ResponseService } from "../../core";
import { PermissionGuard, Permissions } from "../../core/security";
import { LoggerInterceptor } from "../../interceptors";
import { CreateUserDTO } from "../dtos";
import { UsersRestService } from "./users.rest.service";
import CONSTANTS from "../constants";

@UseGuards(PermissionGuard)
@UseInterceptors(LoggerInterceptor)
@ApiTags('Users')
@Controller('/users')
export class UsersController {
    constructor(
        readonly usersRestService: UsersRestService,
        readonly responseService: ResponseService,
    ) {}

    @Get('')
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'List of users',
    })
    @ApiOperation({
        summary: 'Gets a list of users',
    })
    @ApiQuery({
        name: 'email',
        required: false,
        type: String,
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Permissions('USERS_READ')
    @UsePipes(
        new DefaultPaginationPipe(),
        new DefaultOrderPipe(CONSTANTS.DEFAULT_ORDER),
        new TranslateOrderPipe(CONSTANTS.TRANSLATION_KEYS),
    )
    async find(
        @Session() session,
        @Query() query,
    ) {
        const { permissions } = session;
        const users = this.usersRestService.findAll(query, permissions);

        return this.responseService.getSuccessResponse(users);
    }

    @Post('')
    @HttpCode(201)
    @ApiResponse({
        status: 201,
        description: 'Creates a new user',
    })
    @ApiOperation({
        summary: 'Creates a new user',
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async create(
        @Session() session,
        @Body() createUserDTO: CreateUserDTO,
    ) {
        const { permissions } = session;
        const user = await this.usersRestService.create(createUserDTO, permissions);

        return this.responseService.getSuccessResponse(user);
    }

    @Get(':id')
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Gets one user',
    })
    @ApiOperation({
        summary: 'Gets one user',
    })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async findOne(
        @Param('id') id,
        @Session() session,
    ): Promise<any> {
        const { permissions } = session;
        const user = await this.usersRestService.findOne(id, permissions);

        return this.responseService.getSuccessResponse(user);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiResponse({
        status: 204,
        description: 'Deletes a user',
    })
    @ApiOperation({
        summary: 'Deletes a user',
    })
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async delete(@Param('id') id): Promise<any> {
        const user = await this.usersRestService.remove(id);

        return this.responseService.getSuccessResponse(user);
    }
}
