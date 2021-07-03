export class CacheException extends Error {
    code: number;
    constructor(code?: number, message?:string, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CacheException);
        }

        this.name = 'CacheException';
        this.code = code;
        this.message = message;
    }
}

export class NotFound extends Error {
    constructor(message,...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFound);
        }

        this.name = 'NotFound';
        this.message = message;
    }
}
