import { CacheException, NotFound } from './cache.exceptions.entity';

export interface CacheService {
    ping(): Promise<any | CacheException | NotFound>;
    save(id: string, object: any, ttl?:any): Promise<any | CacheException>;
    getAndTouch(id: string, ttl?:any): Promise<any | CacheException | NotFound>;
    get(id: string): Promise<any | CacheException | NotFound>;
    delete(id: string): Promise<any | CacheException>;
}
