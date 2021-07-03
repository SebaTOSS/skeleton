import { AuthService } from '../auth.service';

describe('Auth Service', () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService();
    });

    it('should return that has permission', () => {
        const permissions = [{ name: 'TEST' }];
        const permission = 'TEST';
        const result = authService.hasPermission(permissions, permission);

        expect(result).toBeTruthy();
    });

    it('should return that not has permission', () => {
        const permissions = [{ name: 'TEST' }];
        const permission = 'NO';
        const result = authService.hasPermission(permissions, permission);

        expect(result).toBeFalsy();
    });
});
