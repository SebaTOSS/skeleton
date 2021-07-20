import { ResourceDTO } from "./resource.dto";

export class PaginationDTO<T> extends ResourceDTO {
  constructor(type: new () => T, data: any) {
    super();
    this.type = type;
    this.page = data.page;
    this.pages = data.pages;
    this.total = data.total;
    this.prevPage = data.prevPage;
    this.perPage = data.perPage;
    this.nextPage = data.nextPage;
    this.query = data.query;
    this.metadata = data.metadata;
    this.links = {};
  }

  type: any;
  page: number;
  pages: number;
  total: number;
  prePage: number;
  prevPage: number;
  perPage: number;
  nextPage: number;
  query: any;

  cleanUp() {
    delete this.metadata;
    delete this.query;
    delete this.type;
  }
}
