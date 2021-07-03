import { Injectable } from '@nestjs/common';
import { UtilsService } from '../../utils/utils.service';
import { PaginationDTO, ResourceDTO, ResourcesDTO } from '../dtos';
import * as _ from 'lodash';

const createLink = (method, rel, url) => ({
    method,
    rel,
    url,
});

@Injectable()
export class PaginationService {
    static translate(
        object: any,
        dto: PaginationDTO<ResourcesDTO<ResourceDTO>>,
        query: any = {},
    ): PaginationDTO<ResourcesDTO<ResourceDTO>> {
        const {
            page,
            pages,
            total,
            prev_page: prevPage,
            per_page: perPage,
            next_page: nextPage,
        } = object;

        dto.page = page;
        dto.pages = pages;
        dto.total = total;
        dto.prevPage = prevPage;
        dto.perPage = perPage;
        dto.nextPage = nextPage;
        dto.query = query;
        dto.links = {};

        return dto;
    }

    getLinks(baseUrl, url, prevPage, page, nextPage, perPage, currentQuery) {
        const query = _.omit(currentQuery, ['perPage', 'page']);
        return {
            perPages: {
                10: createLink(
                    'GET',
                    'perPage-10',
                    `${baseUrl}/${url}?perPage=${10}&${UtilsService.serialize(
                        query,
                    )}`,
                ),
                25: createLink(
                    'GET',
                    'perPage-25',
                    `${baseUrl}/${url}?perPage=${25}&${UtilsService.serialize(
                        query,
                    )}`,
                ),
                50: createLink(
                    'GET',
                    'perPage-50',
                    `${baseUrl}/${url}?perPage=${50}&${UtilsService.serialize(
                        query,
                    )}`,
                ),
            },
            template: createLink(
                'GET',
                'previous',
                `${baseUrl}/${url}?perPage=${perPage}&page=:id&${UtilsService.serialize(
                    query,
                )}`,
            ),
            previous: prevPage
                ? createLink(
                      'GET',
                      'previous',
                      `${baseUrl}/${url}?perPage=${perPage}&page=${prevPage}&${UtilsService.serialize(
                          query,
                      )}`,
                  )
                : undefined,
            current: query
                ? createLink(
                      'GET',
                      'current',
                      `${baseUrl}/${url}?perPage=${perPage}&page=${page}&${UtilsService.serialize(
                          query,
                      )}`,
                  )
                : createLink(
                      'GET',
                      'current',
                      `${baseUrl}/${url}?perPage=${perPage}&page=${page}`,
                  ),
            next: nextPage
                ? createLink(
                      'GET',
                      'next',
                      query
                          ? `${baseUrl}/${url}?perPage=${perPage}&page=${nextPage}&${UtilsService.serialize(
                                query,
                            )}`
                          : `${baseUrl}/${url}?perPage=${perPage}&page=${nextPage}`,
                  )
                : undefined,
        };
    }
}
