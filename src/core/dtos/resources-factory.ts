import { PaginationDTO } from "./pagination.dto";
import { ResourcesDTO } from "./resources.dto";

export class ResourcesFactory {
  static create(
    type: any,
    items: Array<any>,
    query: any,
    total: number,
    metadata?: any
  ): ResourcesDTO<any> {
    const resources = new ResourcesDTO(type);
    resources.metadata = metadata;
    resources.items = items.map((entity) => new type(entity));
    resources.query = query;

    const { take, page } = query;
    const currentPage = +page || 0;
    const pages = Math.round(total / take);

    if (pages) {
      const prevPage = currentPage - 1 <= 0 ? 0 : currentPage - 1;
      const nextPage = (currentPage + 1) * take <= total ? currentPage + 1 : 0;
      const data = {
        total,
        pages,
        prevPage,
        nextPage,
        metadata,
        page: currentPage,
        perPage: take,
      };
      resources.pagination = new PaginationDTO(type, data);
    }

    return resources;
  }
}
