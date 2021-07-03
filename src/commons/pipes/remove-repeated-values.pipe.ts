import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class RemoveRepeatValues implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type === 'query') {
            _.keys(value).map(key =>{
                value[key] = _.isArray(value[key]) ?  value[key][0]: value[key];
            });
        }

        return value;
    }
}
