import { ObjectSchema } from '@hapi/joi';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { SchemaException } from '../../core/exceptions/schema.exception';

@Injectable()
export class SchemaValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema, private readonly allowUnknown: boolean = true) { }

    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type === 'body') {
            const { error } = this.schema.validate(value, {
                allowUnknown: this.allowUnknown,
            });
            if (error) {
                throw new SchemaException(error);
            }

            return value;
        }

        return value;
    }
}
