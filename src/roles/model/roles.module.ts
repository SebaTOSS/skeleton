import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoreModule } from "../../core";
import { Permission } from "../entities/permission.entity";
import { Role } from "../entities/role.entity";
import { RolesService } from "./roles.service";

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([Role, Permission])],
  providers: [RolesService],
  exports: [TypeOrmModule, RolesService],
})
export class RolesModule {}
