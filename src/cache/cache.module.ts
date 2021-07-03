import { DynamicModule, Global, Module } from '@nestjs/common';
import confService from '../config/config-service';
import * as Implementations from './index';

export interface Settings {
    service: string
}

const getImplementation = (name:string) => {
    switch (name) {
        case 'redis':
            return Implementations['RedisService'];
        case 'couchBase':
            return Implementations['CouchBaseService'];
        default:
            return Implementations['MemoryService'];
    }
}

@Global()
@Module({})
export class CacheModule {
    public static forRoot(): DynamicModule {
        const cache = confService.get('configurations.cache.name');
        const cacheProvider = {
            provide: 'CacheService',
            useClass: getImplementation(cache),
        };

        return {
            module: CacheModule,
            providers: [cacheProvider],
            exports: [cacheProvider],
        };
    }
}
