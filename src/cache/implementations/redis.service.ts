import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CacheException, NotFound } from '../cache.exceptions.entity';
import { CacheService } from '../cache.service';
import * as redis from 'redis';
import ConfigService from '../../config/config.service';
import CONSTANTS from './constants';

@Injectable()
export class RedisService implements OnModuleInit, CacheService {
    private client: any;
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly configService: ConfigService,
    ) { }

    onModuleInit() {
        if (process.env.NODE_ENV !== 'test') {
            this.init();
        }
    }

    private init() {
        const {
            url,
            port,
            password,
            extras: {
                tlsEnabled
            }
        } = this.configService.get('configurations.cache.settings');


        if (tlsEnabled) {
            const connectionString = `rediss://${url}:${port}`;
            this.client = redis.createClient(connectionString, { tls: { servername: new URL(connectionString).hostname } });
        } else {
            this.client = redis.createClient({
                port: port,
                host: url,
            });
        }

        this.client.auth(password);
        this.client.on('error', (error: any) => this.logger.error('Redis error ', error));
        this.client.on('warning', (e: any) => this.logger.info('Redis warning', e));
        this.client.on('ready', () => this.logger.info('Redis ready'));
    }

    async ping(): Promise<any | CacheException> {
        const promise = new Promise((resolve, reject) => {
            if (this.client.connected) {
                this.client.send_command('PING', (err: any, result: any) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result);
                });
            } else {
                return reject(new CacheException());
            }

        });

        return promise;
    }

    async save(id: string, document: any, ttl = CONSTANTS.TTL_DEFAULT): Promise<any | CacheException> {
        const promise = new Promise((resolve, reject) => {
            this.client.setex(
                id,
                ttl,
                JSON.stringify(document),
                (err: any, result: any) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result);
                },
            );
        });
        return promise;
    }

    async get(id: string): Promise<any | CacheException | NotFound> {
        const promise = new Promise((resolve, reject) => {
            this.client.get(
                id,
                (err: any, result: any) => {
                    if (err) {
                        return reject(new CacheException(err.code, err.message));
                    }
                    if (!result) {
                        return reject(new NotFound('DocumentId not exist'));
                    }

                    return resolve(JSON.parse(result));
                }
            );

        });
        return promise;
    }

    async getAndTouch(id: string, ttl = CONSTANTS.TTL_DEFAULT): Promise<any | CacheException | NotFound> {
        const promise = new Promise((resolve, reject) => {
            this.client.get(
                id,
                (err: any, result: any) => {
                    if (err) {
                        return reject(new CacheException(err.code, err.message));
                    }
                    if (!result) {
                        return reject(new NotFound('DocumentId not exist'));
                    }
                    this.client.expire(id, ttl);
                    return resolve(JSON.parse(result));
                }
            );

        });
        return promise;
    }

    async delete(id: string): Promise<any | CacheException> {
        const promise = new Promise((resolve, reject) => {
            this.client.del(id, (err: any, result: any) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
        return promise;
    }
}
