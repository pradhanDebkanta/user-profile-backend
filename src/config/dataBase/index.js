const localDB = {
    url: process.env.LOCAL_DATABASE_URL,
};

const devDB = {
    url: process.env.LOCAL_DATABASE_URL,
};

const prodDB = {
    url: process.env.DATABASE_URL,
};

const testDB = {
    url: process.env.TEST_DATABASE_URL,
}

const getDBURL = () => {
    switch (process.env.NODE_ENV) {
        case 'local':
            return localDB;
        case 'development':
            return devDB;
        case 'production':
            return prodDB;
        case 'test':
            return testDB;
        default:
            return;
    }
};

module.exports = {
    getDBURL: getDBURL()
}