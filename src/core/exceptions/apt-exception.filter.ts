import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RequestService } from '../../interceptors/logger/request.service';
import { RequestLoggerService } from '../../interceptors/logger/requestLogger.service';
import { APTException } from './apt.exception';
import { ErrorHandlerService } from './error-handler.service';

@Catch(APTException)
export class APTExceptionsFilter implements ExceptionFilter {
    constructor(
        private readonly requestLogger: RequestLoggerService,
        private readonly requestService: RequestService,
        private readonly errorHandler: ErrorHandlerService,
    ) { }

    catch(exception: APTException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const { reqId } = request;

        const { status, errors } = this.errorHandler.handleAPTException(
            exception,
        );
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
