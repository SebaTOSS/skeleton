import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { EntityNotFoundError } from "typeorm";
import { ErrorHandlerService } from "./error-handler.service";
import { RequestService } from "../../interceptors/logger/request.service";
import { RequestLoggerService } from "../../interceptors/logger/requestLogger.service";

@Catch(EntityNotFoundError)
export class ORMExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly requestLogger: RequestLoggerService,
    private readonly requestService: RequestService,
    private readonly errorHandler: ErrorHandlerService
  ) {}

  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { reqId } = request;

    const res = {
      statusCode: 404,
      data: {},
    };
    this.requestLogger.generateBriefRQLog(request, res, []);
    this.requestService.cleanCurrentRequest(reqId);

    response.status(404).json({ success: false, message: exception.message });
  }
}
