import { ApiProperty } from "@nestjs/swagger";
import { ResourceDTO } from "../../core/dtos/resource.dto";

export class DepartmentDTO extends ResourceDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  isActive: boolean;
}
