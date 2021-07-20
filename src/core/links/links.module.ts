import { Module } from "@nestjs/common";
import { UtilsModule } from "../../utils";
import { LinksFactoryService, LinksUtilsService } from "./index";
import { PaginationLinksService } from "./resources/pagination-links.service";

@Module({
  imports: [UtilsModule],
  providers: [LinksFactoryService, LinksUtilsService, PaginationLinksService],
  exports: [LinksFactoryService, LinksUtilsService, PaginationLinksService],
})
export class LinksModule {}
