import { Injectable } from '@nestjs/common';
import { censoredFields, censoredHeaders } from './constants';

const censored = [...censoredHeaders, ...censoredFields];

@Injectable()
export class ObfuscateFieldsService {
    static isObfuscableValue(value: any) {
        const type = typeof value;

        return value && type !== 'object' && type !== 'function' && type !== 'number';
    }

    static obfuscateField(key: string, value: any) {
        if (ObfuscateFieldsService.isObfuscableValue(value) && censored.includes(key)) {
            const replace = '******';

            return value.replace(/(^.{1})(.*)(\w+)/gim, `$1${replace}$3`)
        }

        return value;
    }
}
