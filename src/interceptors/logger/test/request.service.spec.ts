import { RequestService } from '../request.service';

describe('Request Service Unit Testing', () => {
    let requestService: RequestService;

    beforeEach(done => {
        requestService = new RequestService();
        return done();
    });

    afterAll(done => {
        return done();
    });

    it('Should save current request with id 1', done => {
        const response: any = {
            config: {
                url: 'url',
                method: 'method',
                data: '{ "name": 1 }',
                headers: {
                    Authorization: '1234',
                },
            },
            data: {
                response: 'response',
            },
            status: 'status',
        };

        const reqId = requestService.getRequestId();
        requestService.setCurrentRequest(reqId, response);
        const request = requestService.getCurrentRequest(reqId);
        expect(request).toEqual([
            {
                data: {
                    name: 1,
                },
                headers: {
                    Authorization: '1234',
                },
                method: 'method',
                params: '',
                response: {
                    data: {
                        response: 'response',
                    },
                    statusCode: 'status',
                },
                url: 'url',
            },
        ]);

        done();
    });

    it('Should add a new request with id 1', done => {
        const firstResponse: any = {
            config: {
                url: 'url',
                method: 'method',
                data: '{ "name": 1 }',
                headers: {
                    Authorization: '1234',
                },
            },
            data: {
                response: 'response',
            },
            status: 'status',
        };
        const secondResponse: any = {
            config: {
                url: 'url',
                method: 'method',
                data: null,
                headers: {
                    Authorization: '1234',
                },
            },
            data: {
                response: 'response',
            },
            status: 'status',
        };

        const reqId = requestService.getRequestId();
        requestService.setCurrentRequest(reqId, firstResponse);
        requestService.setCurrentRequest(reqId, secondResponse);
        const request = requestService.getCurrentRequest(reqId);
        expect(request).toHaveLength(2);
        expect(request).toContainEqual({
            data: {
                name: 1,
            },
            headers: {
                Authorization: '1234',
            },
            method: 'method',
            params: '',
            response: {
                data: {
                    response: 'response',
                },
                statusCode: 'status',
            },
            url: 'url',
        });

        done();
    });

    it('Should remove request with id 1', done => {
        const firstResponse: any = {
            config: {
                url: 'url',
                method: 'method',
                data: '{ "name": 1 }',
                headers: {
                    Authorization: '1234',
                },
            },
            data: {
                response: 'response',
            },
            status: 'status',
        };

        const reqId = requestService.getRequestId();
        requestService.setCurrentRequest(reqId, firstResponse);
        let request = requestService.getCurrentRequest(reqId);

        expect(request).toBeDefined();
        expect(request).toHaveLength(1);

        requestService.cleanCurrentRequest(reqId);
        request = requestService.getCurrentRequest(reqId);

        expect(request).toBeUndefined();

        done();
    });
});
