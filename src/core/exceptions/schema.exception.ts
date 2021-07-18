import { APIException } from "./api.exception";

export class SchemaException extends APIException {
  message: any;
  constructor(error?: Error) {
    super("Schema", 400, error);
    this.message = error ? error.message : "error";
  }
}
