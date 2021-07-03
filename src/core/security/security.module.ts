import { Module } from '@nestjs/common';
import { LoggerModule } from '../../interceptors';
import { UtilsModule } from '../../utils';
import { ServicesModule } from '../services/services.module';
import { ApiKeyService } from './apikey.service';
import { AuthService } from './auth.service';
import { APIKeyGuard } from './guards/api.key.guard';
import { PermissionGuard } from './guards/permission.guard';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
    imports: [
        LoggerModule,
        UtilsModule,
        ServicesModule,
    ],
    providers: [
        APIKeyGuard,
        PermissionGuard,
        AuthService,
        ApiKeyService,
        AuthMiddleware,
    ],
    exports: [
        APIKeyGuard,
        PermissionGuard,
        AuthService,
        ApiKeyService,
        AuthMiddleware,
    ],
})
export class SecurityModule {}
