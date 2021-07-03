/* eslint-disable @typescript-eslint/camelcase */
import ConfigService from '../config.service';

describe('Config Service', () => {
    let configService: ConfigService;
    beforeEach(() => {
        configService = new ConfigService();
        configService.config = __dirname + '/config/config.json';
        configService.sensible = __dirname + '/config/sensible.json';
    });

    describe('Read configuration from file and complete with sensible file', () => {
        it('Read configuration', () => {
            configService.init();
            const confExpected = {
                customActions: {},
                configurations: {
                    cache: 'redis',
                    removeActionLinks: [
                        {
                          entity: 'AgentDTO',
                          links: [
                            'self.activation'
                          ]
                        }
                      ]
                }
            };

            expect(configService.conf).toEqual(confExpected);
        });
    });

    it('Read configuration value', () => {
        configService.init();
        const value = configService.get('configurations.cache');
        expect(value).toEqual('redis');
    });
    it('Read configuration with wrong path', () => {
        configService.init();
        const value = configService.get('configurations.cacheUrl');
        expect(value).toEqual('');
    });
});

