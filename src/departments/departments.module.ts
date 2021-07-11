import { Module } from "@nestjs/common";
import { CoreModule } from "../core";
import { LoggerModule } from "../interceptors";
import { DepartmentLinksService } from "./departments-links.service";
import { DepartmentsRequiredResourcesService } from "./departments-required-resources.service";
import { DepartmentsController } from "./departments.controller";
import { DepartmentsService } from "./departments.service";

@Module({
  imports: [CoreModule, LoggerModule],
  controllers: [DepartmentsController],
  providers: [
    DepartmentsService,
    DepartmentLinksService,
    DepartmentsRequiredResourcesService,
  ],
  exports: [
    DepartmentsService,
    DepartmentLinksService,
    DepartmentsRequiredResourcesService,
  ],
})
export class DepartmentsModule {}
