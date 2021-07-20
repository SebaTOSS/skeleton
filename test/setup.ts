beforeAll(() => {
    process.env.CONFIG_FILE = 'test/config/config.json';
    process.env.SENSIBLE_FILE = 'test/config/config.json';
    process.env.NODE_ENV = 'test';
    process.env.ENVIRONMENT = 'test';
    process.env.PORT = '1500';
    process.env.API_FILE_LOG = 'test.log';
});

