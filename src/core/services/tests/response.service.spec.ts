import { ResponseService } from '../response.service';

describe('Response service', () => {
    let service: ResponseService;

    beforeEach(() => {
        service = new ResponseService();
    });

    describe('Get success', () => {
        it('should return a success response without data', () => {
            const result = service.getSuccessResponse();

            expect(result).toBeDefined();
            expect(result).toEqual({
                success: true,
                errors: [],
                warnings: [],
            });
        });

        it('should return a success response with data', () => {
            const data = {};
            const result = service.getSuccessResponse(data);

            expect(result).toBeDefined();
            expect(result).toEqual({
                data,
                success: true,
                errors: [],
                warnings: [],
            });
        });
    });

    describe('Get error', () => {
        it('should return error', () => {
            const errors = [
                {
                    code: 1,
                    message: 'error',
                    details: 'error',
                    avoid: true,
                },
            ];
            const result = service.getErrorResponse(errors);

            expect(result).toBeDefined();
            expect(result).toEqual({
                success: false,
                data: null,
                errors: [
                    {
                        code: 1,
                        message: 'error',
                        details: 'error',
                    },
                ],
            });
        });
    });
});
