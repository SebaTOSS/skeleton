import createMockInstance from 'jest-create-mock-instance';
import { PropsService, UtilsService } from './../../../utils';
import { RequestLoggerService } from '../requestLogger.service';
import ConfigService from './../../../config/config.service';

describe('Request Logger Service Unit Testing', () => {
    let requestLoggerService: RequestLoggerService;
    let utilsService: UtilsService;
    let propsService: PropsService;

    const logger: any = {
        warn: () => ({ id: 1 }),
    };
    let configService: ConfigService;

    beforeEach(done => {
        configService = createMockInstance(ConfigService);
        jest.spyOn(configService, 'get').mockReturnValue('test1');

        propsService = new PropsService();
        utilsService = new UtilsService(propsService);

        requestLoggerService = new RequestLoggerService(logger, utilsService);

        return done();
    });

    afterAll(done => {
        return done();
    });

    it('Generate brief log', done => {
        jest.spyOn(logger, 'warn').mockImplementationOnce(() => undefined);
        const request = {
            path: 'path',
            method: 'method',
            params: null,
            body: {
                id: 1,
                name: 'name',
            },
            query: {
                value: 'a',
            },
            headers: {
                authorization: 'test1',
            },
            trace: {},
        };
        const response = {
            statusCode: 200,
            data: {
                value: 1,
            },
        };
        const thirdPartyRequest = [
            {
                data: {
                    name: 1,
                },
                headers: {
                    'EE-API-KEY': 'test1',
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
            {
                data: {
                    name: 1,
                },
                headers: {
                    KEY: 'test1',
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
            {
                data: {
                    name: 1,
                },
                headers: {
                    authorization: 'aaaa',
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
        ];

        const calledWith =
        '{\"path\":\"path\",\"method\":\"method\",\"trace\":{},\"params\":{},\"query\":{\"value\":\"a\"},\"payload\":{\"id\":1,\"name\":\"n******e\"},\"headers\":{\"authorization\":\"t******1\"},\"response\":{\"statusCode\":200,\"data\":{\"value\":1}},\"requests\":[{\"data\":{\"name\":1},\"headers\":{\"EE-API-KEY\":\"t******1\"},\"method\":\"method\",\"params\":\"\",\"response\":{\"data\":{\"response\":\"response\"},\"statusCode\":\"status\"},\"url\":\"url\"},{\"data\":{\"name\":1},\"headers\":{\"KEY\":\"test1\"},\"method\":\"method\",\"params\":\"\",\"response\":{\"data\":{\"response\":\"response\"},\"statusCode\":\"status\"},\"url\":\"url\"},{\"data\":{\"name\":1},\"headers\":{\"authorization\":\"a******a\"},\"method\":\"method\",\"params\":\"\",\"response\":{\"data\":{\"response\":\"response\"},\"statusCode\":\"status\"},\"url\":\"url\"}]}';       requestLoggerService.generateBriefRQLog(
            request,
            response,
            thirdPartyRequest,
        );
        expect(logger.warn).toBeCalledWith(calledWith);
        done();
    });
});
