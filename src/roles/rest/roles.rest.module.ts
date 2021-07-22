import { Module } from "@nestjs/common";
import { RolesModule } from "../model/roles.module";
import { RolesLinksService } from "./roles-links.service";
import { RolesRequiredResourcesService } from "./roles-required-resources.service";
import { RolesController } from "./roles.controller";

@Module({
  imports: [RolesModule],
  controllers: [RolesController],
  providers: [RolesRequiredResourcesService, RolesLinksService],
  exports: [RolesRequiredResourcesService, RolesLinksService],
})
export class RolesRESTModule {}
