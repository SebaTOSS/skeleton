import { Injectable } from "@nestjs/common";

@Injectable()
export class ToService {
  /**
   * Function receives a promise as parameter and return a pre-structured response
   * @param {Promise} promise
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
