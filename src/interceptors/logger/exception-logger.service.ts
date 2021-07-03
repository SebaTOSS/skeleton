import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ObfuscateFieldsService } from './obfuscate-fields.service';

@Injectable()
export class ExceptionLoggerService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    log(message: string, data: any) {
        const entry = {
            error: message,
            data,
        };
        this.logger.warn(JSON.stringify(entry, ObfuscateFieldsService.obfuscateField));
    }
}
