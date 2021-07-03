import { UtilsService } from '../utils.service';
import { PropsService } from '../props.service';

describe('Utils Service Unit Testing', () => {
    let utilsService: UtilsService;
    let propsService: PropsService;

    beforeEach(done => {
        propsService = new PropsService();
        utilsService = new UtilsService(propsService);
        return done();
    });

    afterAll(done => {
        return done();
    });

    it('Should omit values not allowed in object', done => {
        const forbiddenFields = ['name', 'forbidden'];
        const object = {
            valueA: {
                forbidden: 'do',
                innerValueA: {
                    name: 'test',
                    other: 'other',
                },
            },
            arrayA: [
                {
                    id: 1,
                    name: 'itemA',
                    forbidden: 'forbidden',
                },
                {
                    id: 1,
                    name: 'itemA',
                    forbidden: 'forbidden',
                },
            ],
            valueB: {
                name: 'name',
            },
        };
        const value = utilsService.omitDeep(object, forbiddenFields);
        expect(value).toBeDefined();
        expect(value).toEqual({
            valueA: {
                innerValueA: {
                    other: 'other',
                },
            },
            arrayA: [
                {
                    id: 1,
                },
                {
                    id: 1,
                },
            ],
            valueB: {},
        });
        done();
    });
});
