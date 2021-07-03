import { levelLog } from '../utils';

describe('Logs Utils', () => {
    describe('levelLog', () => {
        it('should return info level', () => {
            const result = levelLog('local');

            expect(result).toEqual('info');
        });

        it('should return silent level', () => {
            const result = levelLog('test');

            expect(result).toEqual('silent');
        });

        it('should return waring level', () => {
            const result = levelLog('production');

            expect(result).toEqual('warn');
        });
    });
});
