import { RequestService } from "../../../interceptors/logger/request.service";
import { RequestLoggerService } from "../../../interceptors/logger/requestLogger.service";
import { APIExceptionsFilter } from "../api-exception.filter";
import { APIException } from "../api.exception";
import { ErrorHandlerService } from "../error-handler.service";
import ConfigService from "./../../../config/config.service";
import createMockInstance from "jest-create-mock-instance";
import { UtilsService } from "../../../utils";

describe("APT Exception Filter", () => {
  let exceptionFilter: APIExceptionsFilter;
  let requestService: RequestService;
  let requestLogger: RequestLoggerService;
  let errorHandler: ErrorHandlerService;
  let utilsService: UtilsService;
  const logger: any = {
    warn: () => ({ id: 1 }),
  };
  let configService: ConfigService;

  beforeEach(() => {
    configService = createMockInstance(ConfigService);
    jest.spyOn(configService, "get").mockReturnValue("test");

    utilsService = new UtilsService();
    requestLogger = new RequestLoggerService(logger, utilsService);
    requestService = new RequestService();
    errorHandler = new ErrorHandlerService();
    exceptionFilter = new APIExceptionsFilter(
      requestLogger,
      requestService,
      errorHandler
    );
  });

  it("should handle catch an exception", () => {
    const error = new Error("Error");
    const exception = new APIException("test", 400, error);
    const request = {
      reqId: 1,
    };
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const host = {
      getClass: jest.fn(),
      getHandler: jest.fn(),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
      getType: jest.fn(),
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValueOnce(request),
      getResponse: jest.fn().mockReturnValueOnce(response),
    };

    jest.spyOn(errorHandler, "handleAPIException").mockReturnValue({
      status: 400,
      errors: [],
    });
    jest.spyOn(requestLogger, "generateBriefRQLog");
    jest.spyOn(requestService, "cleanCurrentRequest");

    exceptionFilter.catch(exception, host);

    expect(errorHandler.handleAPIException).toHaveBeenCalledWith(exception);
    expect(requestLogger.generateBriefRQLog).toHaveBeenCalled();
    expect(requestService.cleanCurrentRequest).toHaveBeenCalledWith(1);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalled();
  });
});
