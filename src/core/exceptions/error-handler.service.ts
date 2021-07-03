import { Injectable } from '@nestjs/common';
import { APTException } from './apt.exception';

@Injectable()
export class ErrorHandlerService {
    ERROR_MANAGER = {
        400: (response, message) => ({
            detail: message,
            code: 400,
            messages: ['BAD_REQUEST'],
        }),
        401: (response) => ({
            detail: response,
            code: 401,
            messages: ['EnumsAPT.ERRORS.UNAUTHORIZED'],
        }),
        403: (response) => ({
            detail: response,
            code: 403,
            messages: ['EnumsAPT.ERRORS.USER_HAS_NOT_PERMISSION'],
        }),
        404: (response) => ({
            detail: response,
            code: 404,
            messages: ['EnumsAPT.ERRORS.ENTITY_NOT_FOUND'],
        }),
        405: (response) => ({
            detail: response,
            code: 405,
            messages: ['EnumsAPT.ERRORS.USER_HAS_NOT_PERMISSION'],
        }),
        409: (response) => ({
            detail: response,
            code: 409,
            messages: ['EnumsAPT.ERRORS.CONFLICT'],
        }),
        424: (response, message) => ({
            detail: response,
            code: 424,
            messages: [message],
        }),
        500: () => ({
            code: 500,
            messages: ['EnumsAPT.ERRORS.SERVER_ERROR'],
        }),
    };

    handleAPTException(exception: APTException): any {
        const status = exception.getStatus();
        const response = exception.getResponse();
        const errors = this.ERROR_MANAGER[status]
            ? this.ERROR_MANAGER[status](response, exception.message)
            : this.ERROR_MANAGER[500]();

        return { status, errors };
    }
}
