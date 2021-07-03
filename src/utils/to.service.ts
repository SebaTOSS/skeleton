import { Injectable } from '@nestjs/common';

@Injectable()
export class ToService {
    /**
     * @param {Promise} promise
     * Function receives a promise as parameter and return a pre-structured response
     * @return {[err, data]}
     */
    async promiseToAsync(promise: Promise<any>) {
        try {
            const data = await promise;
            return [null, data];
        } catch (err) {
            return [err];
        }
    }
}
