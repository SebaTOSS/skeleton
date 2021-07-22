import { ResourceDTO } from "../../core/dtos/resource.dto";
import { ApiProperty } from "@nestjs/swagger";
import { PermissionDTO } from "./permission.dto";
import { Role } from "../entities/role.entity";

export class RoleDTO extends ResourceDTO {
  constructor(role?: Role) {
    super();
    if (role) {
      this.id = role.id;
      this.name = role.name;
      this.isActive = role.isActive;
      this.permissions = role.permissions.map(
        (permission) => new PermissionDTO(permission)
      );
    }
  }

  @ApiProperty()
  name: string;

  @ApiProperty()
  permissions: Array<PermissionDTO>;

  @ApiProperty()
  isActive: boolean;
}
