import { ResourceDTO } from "../../core/dtos/resource.dto";
import { ApiProperty } from "@nestjs/swagger";

export class PermissionDTO extends ResourceDTO {
  constructor(permission?: any) {
    super();
    if (permission) {
      this.id = permission.id;
      this.name = permission.name;
    }
  }

  @ApiProperty()
  name: string;

  @ApiProperty()
  isActive: boolean;
}
