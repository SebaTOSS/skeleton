import { Injectable } from "@nestjs/common";
import { ResourceDTO, ResourcesDTO } from "../dtos";
import { ResponseDTO } from "../dtos/response.dto";

@Injectable()
export class ResponseService {
  getError(errors: any[]): ResponseDTO {
    const response = new ResponseDTO();
    response.success = false;
    response.errors = errors.map(({ code, message, details }) => ({
      code,
      details,
      message,
    }));

    return response;
  }

  getSuccess(
    data?: ResourceDTO | ResourcesDTO<any>,
    errors: Array<any> = [],
    warnings: Array<any> = [],
    success = true
  ): ResponseDTO {
    const response = new ResponseDTO();
    response.success = success;
    response.errors = errors;
    response.warnings = warnings;
    response.data = data;

    return response;
  }
}
