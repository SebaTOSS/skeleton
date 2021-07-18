import { APIException } from "./api.exception";

export class NotFoundException extends APIException {
  message: any;
  constructor(error?: Error) {
    super("NotFound", 404, error);
    this.message = error.message;
  }
}
