import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
    getErrorResponse(errors: any[]) {
        return {
            success: false,
            data: null,
            errors: errors.map(({ code, message, details }) => {
                return {
                    code,
                    details,
                    message,
                };
            }),
        };
    }

    getSuccessResponse(data?: any, errors: Array<any> = [], warnings: Array<any> = [], success = true): object {
        return {
            success,
            errors,
            warnings,
            data,
        };
    }
}
