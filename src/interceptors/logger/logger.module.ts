import { Global, Module } from '@nestjs/common';
import { UtilsModule } from '../../utils';
import { ExceptionLoggerService } from './exception-logger.service';
import { LoggerInterceptor } from './logger.interceptor';
import { RequestService } from './request.service';
import { RequestLoggerService } from './requestLogger.service';

@Global()
@Module({
    imports: [UtilsModule],
    providers: [
        RequestService,
        LoggerInterceptor,
        RequestLoggerService,
        ExceptionLoggerService,
    ],
    exports: [
        RequestService,
        LoggerInterceptor,
        RequestLoggerService,
        ExceptionLoggerService,
    ],
})
export class LoggerModule {}
