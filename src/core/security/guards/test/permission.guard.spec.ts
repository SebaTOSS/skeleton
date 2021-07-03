import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import createMockInstance from 'jest-create-mock-instance';
import { ApiKeyService } from '../../apikey.service';
import { AuthService } from '../../auth.service';
import { PermissionGuard } from '../permission.guard';
describe('Permission Guard', () => {
    let guard: PermissionGuard;
    let authService: AuthService;
    let apiKeyService: ApiKeyService;
    let reflector: Reflector;

    beforeEach(() => {
        authService = new AuthService();
        reflector = new Reflector();
        apiKeyService = createMockInstance(ApiKeyService);
        jest.spyOn(apiKeyService, 'isValidApiKey').mockReturnValue(false);
        guard = new PermissionGuard(authService, apiKeyService, reflector);
    });

    it('should activate for public method', async done => {
        const context = createMock<ExecutionContext>();

        const result = await guard.canActivate(context);

        expect(result).toBeTruthy();

        done();

    });
    it('should check permission', async done => {
        const context = createMock<ExecutionContext>({
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: { authorization: '2' },
                    session: {
                        permissions: [{ name: 'PUBLIC' }],
                    },
                }),
            }),
        });

        const roles = 'PUBLIC';
        jest.spyOn(reflector, 'get').mockReturnValue(roles);
        const result = await guard.canActivate(context);

        expect(result).toBeTruthy();
        expect(reflector.get).toHaveBeenCalled();

        done();
    });

    it('should check permission and avoid execution', async done => {
        const context = createMock<ExecutionContext>({
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: { authorization: '2' },
                    session: {
                        permissions: [{ name: 'PRIVATE' }],
                    },
                }),
            }),
        });

        const roles = 'PUBLIC';
        jest.spyOn(reflector, 'get').mockReturnValue(roles);
        const result = await guard.canActivate(context);

        expect(result).toBeFalsy();
        expect(reflector.get).toHaveBeenCalled();

        done();
    });
});
