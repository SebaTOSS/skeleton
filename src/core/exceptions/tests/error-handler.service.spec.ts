import { SDKException } from '../../../sdk';
import { APTException } from '../apt.exception';
import { ErrorHandlerService } from '../error-handler.service';

describe('Error Handler Service', () => {
    let service: ErrorHandlerService;

    beforeEach(() => {
        service = new ErrorHandlerService();
    });

    it('should handle SDK exception', () => {
        const errors = [];
        const status = 500;
        const exception = new SDKException('test', status, errors);
        const result = service.handleSDKException(exception);

        expect(result.status).toEqual(status);
        expect(result.errors).toEqual(errors);
    });

    it('should handle APT well known exception', () => {
        const status = 400;
        const error = new Error('Test');
        const exception = new APTException('test', status, error);
        const result = service.handleAPTException(exception);

        const expectedError = {
            detail: 'Test',
            code: 'APT400',
            messages: ['Validation schema error'],
        };
        expect(result.status).toEqual(status);
        expect(result.errors).toEqual(expectedError);
    });

    it('should handle APT unknown exception', () => {
        const status = 100;
        const error = new Error('Test');
        const exception = new APTException('test', status, error);
        const result = service.handleAPTException(exception);

        const expectedError = {
            code: 'APT500',
            messages: ['Server error'],
        };
        expect(result.status).toEqual(100);
        expect(result.errors).toEqual(expectedError);
    });
});
