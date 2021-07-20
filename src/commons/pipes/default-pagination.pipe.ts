import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class DefaultPaginationPipe implements PipeTransform {
  private readonly defaultPerPage: number;
  constructor(perPage?: number) {
    this.defaultPerPage = perPage;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === "query") {
      if (value.perPage) {
        value.take = +value.perPage;
      } else {
        value.take = this.defaultPerPage || 10;
      }

      value.skip = (+value.page || 0) * value.take;

      return value;
    }

    return value;
  }
}
