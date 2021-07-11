import { ResourceDTO } from "./resource.dto";
import { ResourcesDTO } from "./resources.dto";

export class ResponseDTO {
  success: boolean;

  errors: Array<any>;

  warnings: Array<any>;

  data: null | ResourcesDTO<any> | ResourceDTO;
}
