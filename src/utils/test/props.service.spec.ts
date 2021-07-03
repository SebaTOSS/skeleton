import { PropsService } from '../props.service';

describe('Props Service Unit Testing', () => {
    let propsService: PropsService;

    beforeEach(done => {
        propsService = new PropsService();
        return done();
    });

    afterAll(done => {
        return done();
    });

    it('Should get a value of the object', done => {
        const object = {
            valueA: {
                innerValueA: {
                    value: 'test',
                },
            },
        };
        const value = propsService.getPropValue(
            object,
            'valueA.innerValueA.value',
            null,
        );
        expect(value).toBeDefined();
        expect(value).toEqual('test');
        done();
    });

    it('Should get the same object', done => {
        const object = {
            valueA: {
                innerValueA: {
                    value: 'test',
                },
            },
        };
        const value = propsService.getDefaultObject(object);
        expect(value).toBeDefined();
        expect(value).toEqual(object);
        done();
    });

    it('Should get an empty object', done => {
        const object = null;
        const value = propsService.getDefaultObject(object);
        expect(value).toBeDefined();
        expect(value).toEqual({});
        done();
    });
});
