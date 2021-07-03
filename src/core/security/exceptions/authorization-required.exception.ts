export class AuthorizationRequired extends Error {
    constructor(message, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AuthorizationRequired);
        }

        this.name = 'AuthorizationRequired';
        this.message = message;
    }
}
