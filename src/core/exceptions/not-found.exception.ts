import { APTException } from './apt.exception';

export class NotFoundException extends APTException {
    message: any
    constructor(error?: Error) {
        super('NotFound', 404, error);
        this.message = error.message;
    }
}
