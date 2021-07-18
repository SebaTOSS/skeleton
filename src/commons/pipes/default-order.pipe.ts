import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class DefaultOrderPipe implements PipeTransform {
  private readonly defaultOrder: string;
  constructor(order: string) {
    this.defaultOrder = order;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === "query") {
      if (value.order) {
        return value;
      }
      value.order = this.defaultOrder || undefined;

      return value;
    }

    return value;
  }
}
