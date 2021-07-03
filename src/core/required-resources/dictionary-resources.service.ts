import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { ResourceDTO } from '../dtos';

@Injectable()
export class DictionaryResourcesService {
    private dictionary: object = {};

    add<T>(schema: string, dto: new () => T) {
        this.dictionary[schema] = new dto();
    }

    getSchema(resource: any): string {
        const isClass = typeof resource === 'function';
        const name = isClass ? resource.name : resource.constructor.name;
        const schema = _.findKey(
            this.dictionary,
            item => item.constructor.name === name,
        );
        return schema;
    }

    getResource(schema: string): ResourceDTO {
        return this.dictionary[schema];
    }
}
