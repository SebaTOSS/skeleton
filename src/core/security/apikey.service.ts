import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import ConfigService from '../../config/config.service';
import { AuthorizationRequired } from './exceptions/authorization-required.exception';

@Injectable()
export class ApiKeyService {
    private API_KEYS: string[] = [];
    constructor(
        private readonly configService: ConfigService
    ) {
        this.API_KEYS = Object.values(this.configService.get('configurations.frontend.keys'));
    }

    isValidApiKey(apiKey) {
        return _.includes(this.API_KEYS, apiKey);
    }

    checkAuthorization(req: any) {
        const {
            headers: {
                authorization,
                cookie,
            },
            query: {
                token
            },
        } = req;

        const sessionCookie = cookie && cookie.includes('skeleton.api=') ? cookie.split('skeleton.api=')[1].split(';')[0] : null;
        const value = authorization || token || sessionCookie;

        if (!value) {
            throw new AuthorizationRequired('Authorization is required');
        }

        return value;
    }
}
