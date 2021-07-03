import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestService } from './request.service';
import { RequestLoggerService } from './requestLogger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    constructor(
        private readonly requestService: RequestService,
        private readonly requestLoggerService: RequestLoggerService,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const { options } = request;
        const { reqId } = options || {};

        if (!reqId) {
            request.options = {
                reqId: this.requestService.getRequestId(),
            };
        }

        return next.handle().pipe(
            tap(data => {
                const { statusCode } = response;
                const thirdPartyRequest = this.requestService.getCurrentRequest(
                    reqId,
                );
                this.requestLoggerService.generateBriefRQLog(
                    request,
                    { statusCode, data },
                    thirdPartyRequest,
                );
                this.requestService.cleanCurrentRequest(reqId);
            }),
        );
    }
}
