import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UtilsService } from '../../utils';
import { Logger } from 'winston';
import { ObfuscateFieldsService } from './obfuscate-fields.service';

@Injectable()
export class RequestLoggerService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly utilsService: UtilsService,
    ) {}

    generateBriefRQLog(
        req: {
            path: any;
            method: any;
            params: any;
            body: any;
            query: any;
            headers: any;
            trace: any;
        },
        res: { statusCode: any; data: any },
        reqThirdParty: any[],
    ) {
        const {
            path,
            method,
            params,
            query,
            headers,
            trace,
            body: payload,
        } = req;

        const brief = {
            path,
            method,
            trace,
            params,
            query,
            payload,
            headers,
            response: res,
            requests: reqThirdParty || [],
        };
        const removedValues = brief;
        this.logger.warn(JSON.stringify(removedValues, ObfuscateFieldsService.obfuscateField));
    }
}
