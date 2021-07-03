import { ApiKeyService } from '../apikey.service';
import ConfigService from './../../../config/config.service';
import createMockInstance from 'jest-create-mock-instance';

describe('Auth Service', () => {
    let apiKeyService: ApiKeyService;
    let configService: ConfigService;

    beforeEach(() => {
        configService = createMockInstance(ConfigService);
        jest.spyOn(configService, 'get').mockReturnValue({ api: 'test1' });
        apiKeyService = new ApiKeyService(configService);
    });

    it('should return is a valid', () => {
        const apiKey = 'test1';
        const result = apiKeyService.isValidApiKey(apiKey);

        expect(result).toBeTruthy();
    });

    it('should return is not a valid', () => {
        const apiKey = 'NO';
        const result = apiKeyService.isValidApiKey(apiKey);

        expect(result).toBeFalsy();
    });
});
