/* eslint-disable @typescript-eslint/no-unused-vars */
import { CacheService } from '../src/cache/cache.service';

export class MockCacheService implements CacheService {
    getAndTouch(id: string, ttl?: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    ping(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    save(id: string, object: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    get(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
