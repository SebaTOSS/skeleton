import { RequestService } from '../../../interceptors/logger/request.service';
import { RequestLoggerService } from '../../../interceptors/logger/requestLogger.service';
import { SDKException } from '../../../sdk';
import { ErrorHandlerService } from '../error-handler.service';
import { SDKExceptionsFilter } from '../sdk-exception.filter';
import ConfigService from './../../../config/config.service';
import createMockInstance from 'jest-create-mock-instance';
import { PropsService, UtilsService } from '../../../utils';

describe('SKD Exception Filter', () => {
    let exceptionFilter: SDKExceptionsFilter;
    let requestService: RequestService;
    let requestLogger: RequestLoggerService;
    let errorHandler: ErrorHandlerService;
    let utilsService: UtilsService;
    let propsService: PropsService;

    const logger: any = {
        warn: () => ({ id: 1 }),
    };
    let configService: ConfigService;

    beforeEach(() => {
        configService = createMockInstance(ConfigService);
        jest.spyOn(configService, 'get').mockReturnValue('test');

        propsService = new PropsService();
        utilsService = new UtilsService(propsService);

        requestLogger = new RequestLoggerService(logger, utilsService);
        requestService = new RequestService();
        errorHandler = new ErrorHandlerService();
        exceptionFilter = new SDKExceptionsFilter(
            requestLogger,
            requestService,
            errorHandler,
        );
    });

    it('should handle catch an exception', () => {
        const exception = new SDKException('test', 400, []);
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

        jest.spyOn(errorHandler, 'handleSDKException').mockReturnValue({
            status: 400,
            errors: [],
        });
        jest.spyOn(requestLogger, 'generateBriefRQLog');
        jest.spyOn(requestService, 'cleanCurrentRequest');

        exceptionFilter.catch(exception, host);

        expect(errorHandler.handleSDKException).toHaveBeenCalledWith(exception);
        expect(requestLogger.generateBriefRQLog).toHaveBeenCalled();
        expect(requestService.cleanCurrentRequest).toHaveBeenCalledWith(1);
        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalled();
    });
});
