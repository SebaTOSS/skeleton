import { HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NotFound } from '../../../cache/cache.exceptions.entity';
import { CacheService } from '../../../cache/cache.service';
import { ResponseService } from '../../services';
import { ApiKeyService } from '../apikey.service';
import { AuthorizationRequired } from '../exceptions/authorization-required.exception';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        @Inject('CacheService')
        private readonly cacheService: CacheService,
        private readonly apiKeyService: ApiKeyService,
        private readonly responseService: ResponseService,
    ) {}

    async use(req: any, res: any, next: Function) {
        try {
            const authorization = this.apiKeyService.checkAuthorization(req);
            const hasValidAPIKey = this.apiKeyService.isValidApiKey(authorization);

            if (hasValidAPIKey) {
                req.session = {
                    permissions: [
                        { name: 'USERS_CREATE' },
                        { name: 'USERS_READ' },
                        { name: 'USERS_UPDATE' },
                        { name: 'PUBLIC' },
                    ],
                };
                return next();
            }

            const data: any = await this.cacheService.getAndTouch(authorization);
            const {
                session,
                ticket,
                uuid,
            } = data;
            req.session = session;
            req.ticket = ticket;
            req.uuid = uuid;

            return next();
        } catch (error) {
            let response: any;
            if (error instanceof NotFound) {
                res.status(HttpStatus.UNAUTHORIZED);
                res.type('application/json');

                const errors = [
                    {},
                ];
                response = this.responseService.getErrorResponse(errors);

                return res.json(response);
            }
            if (error instanceof AuthorizationRequired) {

                res.status(HttpStatus.UNAUTHORIZED);
                res.type('application/json');

                const errors = [
                    {},
                ];
                response = this.responseService.getErrorResponse(errors);

                return res.json(response);
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            res.type('application/json');
            response = [
                {},
            ];

            return res.json(response);

        }
    }
}
