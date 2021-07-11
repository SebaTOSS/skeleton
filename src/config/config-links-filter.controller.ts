import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { SchemaValidationPipe } from "../commons";
import { ResponseService } from "../core";
import { APIKeyGuard } from "../core/security";
import { LoggerInterceptor, RequestId } from "../interceptors";
import { ConfigManagerLinksFilterService } from "./config-manager-links-filter.service";
import { LinkRemoveItem } from "./dtos";
import SCHEMAS from "./schemas";

@UseGuards(APIKeyGuard)
@UseInterceptors(LoggerInterceptor)
@ApiTags("API Settings")
@Controller("/action-links")
export class ConfigLinksFilterController {
  constructor(
    private readonly responseService: ResponseService,
    private readonly configManagerLinksFilterService: ConfigManagerLinksFilterService
  ) {}

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "List of items links to remove",
  })
  @ApiOperation({
    summary: "Gets a list of items links to remove",
  })
  async get(): Promise<any> {
    const objects = this.configManagerLinksFilterService.get();

    return this.responseService.getSuccess(objects);
  }

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: "Added new dto to filter links",
  })
  @ApiOperation({
    summary: "Added element to config",
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @UsePipes(new SchemaValidationPipe(SCHEMAS.post))
  async add(@RequestId() reqId, @Body() payload: LinkRemoveItem) {
    return;
  }

  @Delete()
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: "Not content",
  })
  @ApiOperation({
    summary: "Remove an element to config links filter",
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @UsePipes(new SchemaValidationPipe(SCHEMAS.delete))
  async remove(@RequestId() reqId, @Body() payload: any) {
    return;
  }
}
