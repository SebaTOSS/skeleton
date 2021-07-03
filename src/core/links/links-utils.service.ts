import { Injectable } from '@nestjs/common';

@Injectable()
export class LinksUtilsService {
    createLink(method: string, rel: string, url: string) {
        return {
            method,
            rel,
            url,
        };
    }

    hasPermission(name: string, permissions: Array<any>, link: any, flag = true) {
        return permissions && permissions.some(item => item.name === name) && flag ? link : undefined;
    }
}
