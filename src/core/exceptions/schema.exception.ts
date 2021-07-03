import { APTException } from './apt.exception';

export class SchemaException extends APTException {
    message: any
    constructor(error?: Error) {
        super('Schema', 400, error);
        this.message = error ? error.message : 'error';
    }
}
