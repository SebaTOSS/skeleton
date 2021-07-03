import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { NotFound } from '../cache.exceptions.entity';
import { CacheService } from '../cache.service';
import ConfigService from '../../config/config.service';
import CONSTANTS from './constants';

@Injectable()
export class MemoryService implements OnModuleInit, CacheService {
    private buckets: any;

    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly configService: ConfigService,
    ) {}

    onModuleInit() {
        this.buckets = {};
    }

    ping(): Promise<any> {
        return Promise.resolve(true);
    }

    save(id: string, object: any, ttl: any = CONSTANTS.TTL_DEFAULT): Promise<any> {
        this.buckets[id] = { value: object, ttl };

        return Promise.resolve(true);
    }

    getAndTouch(id: string, ttl: any = CONSTANTS.TTL_DEFAULT): Promise<any> {
        const ids = Object.keys(this.buckets);
        const index = ids.find(key => key === id);
        if (index) {
            const { value } = this.buckets[index];

            return Promise.resolve(value);
        }

        return Promise.reject(new NotFound('DocumentId not exist'));
    }

    get(id: string): Promise<any> {
        const ids = Object.keys(this.buckets);
        const index = ids.find(key => key === id);
        if (index) {
            const { value } = this.buckets[index];

            return Promise.resolve(value);
        }

        return Promise.reject(new NotFound('DocumentId not exist'));
    }

    delete(id: string): Promise<any> {
        delete this.buckets[id];

        return Promise.resolve();
    }
}
