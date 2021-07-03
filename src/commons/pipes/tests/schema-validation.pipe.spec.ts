import Joi = require('@hapi/joi');
import { ArgumentMetadata } from '@nestjs/common';
import { SchemaValidationPipe } from '../schema-validation.pipe';

describe('Translate Schema validation pipe', () => {
    let pipe: SchemaValidationPipe;
    const schema = {
        post: Joi.object().keys({
            name: Joi.string().required(),
        }),
    };

    beforeEach(() => {
        pipe = new SchemaValidationPipe(schema.post);
    });

    it('should not validate value from query', () => {
        const value = {};
        const transformMetadata: ArgumentMetadata = {
            type: 'query',
            data: '',
        };
        const result = pipe.transform(value, transformMetadata);
        expect(result).toEqual(value);
    });

    it('should validate successfully', () => {
        const value = {
            name: 'test',
        };
        const transformMetadata: ArgumentMetadata = {
            type: 'body',
            data: '',
        };
        const result = pipe.transform(value, transformMetadata);
        expect(result).toEqual(value);
    });

    it('should validate and throw an exception', () => {
        const value = {};
        const transformMetadata: ArgumentMetadata = {
            type: 'body',
            data: '',
        };
        try {
            pipe.transform(value, transformMetadata);
        } catch (exception) {
            expect(exception.error.message).toEqual('"name" is required');
            expect(exception.status).toEqual(400);
        }
    });
});
