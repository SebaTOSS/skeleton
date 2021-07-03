import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestService {
    private currentRequests = {};

    private reqId = 0;

    setCurrentRequest(
        reqId: string | number,
        response: {
            config: { url: any; method: any; data: any; headers: any };
            data: any;
            status: any;
        },
    ) {
        const {
            config: { url, method, data, headers },
            data: dataResponse,
            status,
        } = response;

        const request = {
            url,
            method,
            headers,
            data: data ? JSON.parse(data) : null,
            params: '',
            response: {
                data: dataResponse,
                statusCode: status,
            },
        };

        if (!this.currentRequests[reqId]) {
            this.currentRequests[reqId] = [request];
        } else {
            this.currentRequests[reqId].push(request);
        }
    }

    getCurrentRequest(reqId: string | number) {
        return this.currentRequests[reqId];
    }

    cleanCurrentRequest(reqId: string | number) {
        if (this.currentRequests[reqId]) {
            delete this.currentRequests[reqId];
        }
    }

    getRequestId() {
        this.reqId += 1;

        return this.reqId;
    }
}
