import { ArgumentMetadata } from '@nestjs/common';
import { DefaultOrderPipe } from '../default-order.pipe';

describe('Default order pipe', () => {
    let pipe: DefaultOrderPipe;
    const defaultOrder = 'id, asc';

    beforeEach(() => {
        pipe = new DefaultOrderPipe(defaultOrder);
    });

    it('should not transform value from body', () => {
        const value = {};
        const transformMetadata: ArgumentMetadata = {
            type: 'body',
            data: '',
        };
        const result = pipe.transform(value, transformMetadata);
        expect(result).toEqual(value);
    });

    it('should return default value', () => {
        const value = {};
        const transformMetadata: ArgumentMetadata = {
            type: 'query',
            data: '',
        };
        const result = pipe.transform(value, transformMetadata);
        expect(result).toEqual({ order: defaultOrder });
    });

    it('should not modify value', () => {
        const value = { order: 'name,desc' };
        const transformMetadata: ArgumentMetadata = {
            type: 'query',
            data: '',
        };
        const result = pipe.transform(value, transformMetadata);
        expect(result).toEqual(value);
    });
});
