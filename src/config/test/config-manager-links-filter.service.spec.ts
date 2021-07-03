/* eslint-disable @typescript-eslint/camelcase */
import { ConfigManagerLinksFilterService } from '../config-manager-links-filter.service';
import ConfigService from '../config.service';

describe('Config Manager Links Service', () => {
    let configService: ConfigService;
    let configManagerLinksService: ConfigManagerLinksFilterService;

    beforeEach(() => {
        configService = new ConfigService();
        configService.config = __dirname + '/config/config.json';
        configService.sensible = __dirname + '/config/sensible.json';
        configManagerLinksService = new ConfigManagerLinksFilterService(configService);

    });

    describe('Operation for links filters by configuration file', () => {
        it('Get', () => {
            configService.init();
            const removedLinks = configManagerLinksService.get()
            const expected = [
                {
                    entity: 'AgentDTO',
                    links: [
                        'self.activation'
                    ]
                }
            ];
            expect(removedLinks).toEqual(expected);
        });

        it('Add', () => {
            configService.init();
            const element = {
                entity: 'CurrencyDTO',
                links: [
                    'self.read'
                ]
            }
            const removedLinks = configManagerLinksService.add(element);
            const expected = [
                {
                    entity: 'AgentDTO',
                    links: [
                        'self.activation'
                    ]
                },
                {
                    entity: 'CurrencyDTO',
                    links: [
                        'self.read'
                    ]
                }
            ];
            expect(removedLinks).toHaveLength(2);
            expect(removedLinks).toEqual(expected);
        });

        it('Delete', () => {
            configService.init();
            const element = {
                entity: 'AgentDTO',
            }
            const removedLinks = configManagerLinksService.delete(element);

            expect(removedLinks).toHaveLength(0);
            expect(removedLinks).toEqual([]);
        });
    });
});

