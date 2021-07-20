/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { UtilsService } from "../../utils/utils.service";
import * as _ from "lodash";

const createLink = (method: string, rel: string, url: string) => ({
  method,
  rel,
  url,
});

@Injectable()
export class PaginationService {
  getLinks(baseUrl, url, prevPage, page, nextPage, perPage, currentQuery) {
    const query = _.omit(currentQuery, ["perPage", "page"]);

    return {
      perPages: {
        10: createLink(
          "GET",
          "perPage-10",
          `${baseUrl}/${url}?perPage=${10}&${UtilsService.serialize(query)}`
        ),
        25: createLink(
          "GET",
          "perPage-25",
          `${baseUrl}/${url}?perPage=${25}&${UtilsService.serialize(query)}`
        ),
        50: createLink(
          "GET",
          "perPage-50",
          `${baseUrl}/${url}?perPage=${50}&${UtilsService.serialize(query)}`
        ),
      },
      template: createLink(
        "GET",
        "previous",
        `${baseUrl}/${url}?perPage=${perPage}&page=:id&${UtilsService.serialize(
          query
        )}`
      ),
      previous: prevPage
        ? createLink(
            "GET",
            "previous",
            `${baseUrl}/${url}?perPage=${perPage}&page=${prevPage}&${UtilsService.serialize(
              query
            )}`
          )
        : undefined,
      current: query
        ? createLink(
            "GET",
            "current",
            `${baseUrl}/${url}?perPage=${perPage}&page=${page}&${UtilsService.serialize(
              query
            )}`
          )
        : createLink(
            "GET",
            "current",
            `${baseUrl}/${url}?perPage=${perPage}&page=${page}`
          ),
      next: nextPage
        ? createLink(
            "GET",
            "next",
            query
              ? `${baseUrl}/${url}?perPage=${perPage}&page=${nextPage}&${UtilsService.serialize(
                  query
                )}`
              : `${baseUrl}/${url}?perPage=${perPage}&page=${nextPage}`
          )
        : undefined,
    };
  }
}
