import { Module } from "@nestjs/common";
import { UserLinksService } from "./users-links.service";
import { UsersRequiredResourcesService } from "./users-required-resources.service";
import { UsersController } from "./users.controller";
import { UsersModule } from "../model/users.module";
import { DepartmentsModule } from "../../departments";

@Module({
  imports: [UsersModule, DepartmentsModule],
  controllers: [UsersController],
  providers: [UsersRequiredResourcesService, UserLinksService],
  exports: [UsersRequiredResourcesService, UserLinksService],
})
export class UsersRESTModule {}
