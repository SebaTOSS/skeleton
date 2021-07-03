import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiKeyService } from '../apikey.service';
import { AuthService } from '../auth.service';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly apiKeyService: ApiKeyService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const id = this.apiKeyService.checkAuthorization(request) ;
        const hasValidAPIKey = this.apiKeyService.isValidApiKey(id);

        if (hasValidAPIKey) {
            return true;
        }

        const roles = this.reflector.get<string>(
            'permission',
            context.getHandler(),
        );
        if (!roles) {
            return true;
        }

        const {
            session: { permissions },
        } = request;
        const result = this.authService.hasPermission(permissions, roles);

        return result;
    }
}
