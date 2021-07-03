import { LinksUtilsService } from '../links-utils.service';

describe('Links Utils Service', () => {
    let linksUtilsService: LinksUtilsService;

    beforeEach(() => {
        linksUtilsService = new LinksUtilsService();
    });

    it('should create a link', () => {
        const method = 'POST';
        const rel = 'test';
        const url = 'http://test.seekda.com';

        const result = linksUtilsService.createLink(method, rel, url);

        expect(result).toEqual({
            method,
            rel,
            url,
        });
    });

    it('should check that has permission', () => {
        const link = {};
        const name = 'test';
        const permissions = [{ name }];
        const result = linksUtilsService.hasPermission(name, permissions, link);

        expect(result).toEqual(link);
    });

    it('should check that not has permission', () => {
        const link = {};
        const name = 'test';
        const permissions = [];
        const result = linksUtilsService.hasPermission(name, permissions, link);

        expect(result).toBeUndefined();
    });
});
