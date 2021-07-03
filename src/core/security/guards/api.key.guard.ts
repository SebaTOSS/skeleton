/* eslint-disable class-methods-use-this */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApiKeyService } from '../apikey.service';

@Injectable()
export class APIKeyGuard implements CanActivate {

    constructor(private readonly apiKeyService: ApiKeyService){}

    canActivate(context: ExecutionContext): boolean {
        const {
            headers: { authorization },
        } = context.switchToHttp().getRequest();
        if (authorization) {
            return this.apiKeyService.isValidApiKey(authorization);
        }

        return false;
    }
}
