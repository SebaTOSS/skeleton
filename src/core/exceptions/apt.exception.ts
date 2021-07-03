import { HttpException } from '@nestjs/common';

export class APTException extends HttpException {
    error: Error;
    type: string;
    code: number;

    constructor(type: string, code: number, error?: Error) {
        super('API', code);
        this.type = type;
        this.error = error;
        this.code = code;
        this.message = error ? error.message : 'error';
    }
}
