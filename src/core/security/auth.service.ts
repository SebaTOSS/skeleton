import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
    hasPermission(permissions, permission) {
        return _.some(permissions, item => item.name === permission);
    }
}
