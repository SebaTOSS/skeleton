import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UtilsService } from '../../utils';

@Injectable()
export class TranslateOrderPipe implements PipeTransform {
    private readonly keys: object;
    constructor(keys: object) {
        this.keys = keys;
    }

    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type === 'query') {
            return UtilsService.translateOrderQuery(value, this.keys);
        }

        return value;
    }
}
