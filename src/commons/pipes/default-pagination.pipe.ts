import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DefaultPaginationPipe implements PipeTransform {
    private readonly defaultPerPage: number;
    constructor(perPage?: number) {
        this.defaultPerPage = perPage;
    }

    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type === 'query') {
            if (value.perPage) {
                return value;
            }
            value.perPage = this.defaultPerPage ? this.defaultPerPage: 10;

            return value;
        }

        return value;
    }
}
