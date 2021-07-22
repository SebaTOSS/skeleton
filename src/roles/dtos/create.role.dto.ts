import { ApiProperty } from "@nestjs/swagger";
import { PermissionDTO } from "./permission.dto";

export class CreateRoleDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  permissions: Array<PermissionDTO>;
}
