// eslint-disable-next-line @typescript-eslint/no-var-requires
const os = require('os');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { format } = require('logform');

const hostname = os.hostname();
const { pid } = process;
let sequence = 0;

const { printf } = format;

export const levelLog = environment => {
    if (environment === 'production') {
        return 'warn';
    }
    if (environment === 'test') {
        return 'silent';
    }
    return 'info';
};

export const loggerFormat = printf(info => {
    sequence += 1;
    return `<134>1 ${info.timestamp} ${hostname} ${process.env.APP_NAME} ${pid} - [meta sequenceId="${sequence}"] {"level":"${info.level}"} ${info.message}`;
});
