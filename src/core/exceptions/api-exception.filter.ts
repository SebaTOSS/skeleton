import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { RequestService } from "../../interceptors/logger/request.service";
import { RequestLoggerService } from "../../interceptors/logger/requestLogger.service";
import { APIException } from "./api.exception";
import { ErrorHandlerService } from "./error-handler.service";

@Catch(APIException)
export class APIExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly requestLogger: RequestLoggerService,
    private readonly requestService: RequestService,
    private readonly errorHandler: ErrorHandlerService
  ) {}

  catch(exception: APIException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { reqId } = request;

    const { status, errors } = this.errorHandler.handleAPIException(exception);
    const res = {
      statusCode: status,
      data: {},
    };
    this.requestLogger.generateBriefRQLog(request, res, []);
    this.requestService.cleanCurrentRequest(reqId);

    response.status(status).json({
      success: false,
      errors,
    });
  }
}
