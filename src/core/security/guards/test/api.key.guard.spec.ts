import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import createMockInstance from 'jest-create-mock-instance';
import ConfigService from '../../../../config/config.service';
import { ApiKeyService } from '../../apikey.service';
import { APIKeyGuard } from '../api.key.guard';


describe('API Key Guard Unit Testing', () => {
    let apiKeyGuard: APIKeyGuard;
    let apiKeyService: ApiKeyService;
    let configService: ConfigService;

    beforeEach(() => {
        configService = createMockInstance(ConfigService);
        jest.spyOn(configService, 'get').mockReturnValue({ api: 'test1' });

        apiKeyService = new ApiKeyService(configService);
        apiKeyGuard = new APIKeyGuard(apiKeyService);
    });

    afterAll(async done => {
        done();
    });

    it('Should allow action for a valid token', () => {
        const executionContext = createMock<ExecutionContext>({
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {
                        authorization: 'test1',
                    },
                }),
            }),
        });
        const isValid = apiKeyGuard.canActivate(executionContext);

        expect(isValid).toBeTruthy();
    });

    it('Should forbidden action for an invalid token', () => {
        const executionContext = createMock<ExecutionContext>({
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {
                        authorization: 'auth',
                    },
                }),
            }),
        });
        const isValid = apiKeyGuard.canActivate(executionContext);

        expect(isValid).toBeFalsy();
    });

    it('Should forbidden action for not sending any token', () => {
        const executionContext = createMock<ExecutionContext>({
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {},
                }),
            }),
        });
        const isValid = apiKeyGuard.canActivate(executionContext);

        expect(isValid).toBeFalsy();
    });
});
