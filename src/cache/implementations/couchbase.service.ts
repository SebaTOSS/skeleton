import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as couchBase from 'couchbase';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CacheException, NotFound } from '../cache.exceptions.entity';
import { CacheService } from '../cache.service';
import ConfigService from '../../config/config.service';
import CONSTANTS from './constants';

const callbackResponse = (
    resolve: (x: any) => void,
    reject: (x: any) => void,
    shouldThrowNotFound = false,
) => (err: any, result: any) => {
    if (err) {
        if (shouldThrowNotFound && err.code === 13) {
            reject(new NotFound('DocumentId not exist'));
        }
        return reject(new CacheException(err.code, err.message));
    }
    const { value } = result;
    return resolve(value);
};

@Injectable()
export class CouchBaseService implements OnModuleInit, CacheService {
    private bucket: any;

    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly configService: ConfigService,
    ) {}

    onModuleInit() {
        if (process.env.NODE_ENV !== 'test') {
            this.init();
        }
    }

    private init() {
        const {
            url,
            user,
            password,
            extras: {
                bucket
            }
        } = this.configService.get('configurations.cache.settings');

        const cluster = new couchBase.Cluster(url);
        cluster.authenticate(user, password);

        this.bucket = cluster.openBucket(bucket);
        this.bucket.durabilityTimeout = 60000;
        this.bucket.connectionTimeout = 60000;
        this.bucket.durabilityInterval = 60000;
        this.bucket.nodeConnectionTimeout = 60000;

        this.bucket.addListener('error', (error: any) =>
            this.logger.log('info', `CouchBase error = ${error}`),
        );
        this.bucket.addListener('connect', () =>
            this.logger.log(
                'info',
                `CouchBase connected Bucket = ${this.bucket.connected}`,
            ),
        );
    }

    async ping(): Promise<any | CacheException> {
        const promise = new Promise((resolve, reject) => {
            this.bucket.getAndTouch(
                'echo',
                CONSTANTS.TTL_DEFAULT,
                callbackResponse(resolve, reject, false),
            );
        });

        return promise;
    }

    async save(id: string, document: any, ttl = CONSTANTS.TTL_DEFAULT): Promise<any | CacheException> {
        const promise = new Promise((resolve, reject) => {
            this.bucket.upsert(
                id,
                document,
                { expiry: ttl },
                callbackResponse(resolve, reject),
            );
        });

        return promise;
    }

    async getAndTouch(id: string, ttl = CONSTANTS.TTL_DEFAULT): Promise<any | CacheException | NotFound> {
        const promise = new Promise((resolve, reject) => {
            this.bucket.getAndTouch(
                id,
                ttl,
                callbackResponse(resolve, reject, true),
            );
        });

        return promise;
    }

    async get(id: string): Promise<any | CacheException | NotFound> {
        const promise = new Promise((resolve, reject) => {
            this.bucket.get(
                id,
                callbackResponse(resolve, reject, true),
            );
        });

        return promise;
    }

    async delete(id: string): Promise<any | CacheException> {
        const promise = new Promise((resolve, reject) => {
            this.bucket.remove(id, callbackResponse(resolve, reject));
        });

        return promise;
    }
}
