module.exports = {
    server: {
        host:'localhost',
        port: 8000
    },
    database: {
        host: 'localhost',
        port: 27017,
        db: 'local',
        url: 'mongodb://127.0.0.1:27017/local'
    },
    key: {
        privateKey: '041DF3169082F312CFEC8BE0FD209834157F6BBEE1C375C33AB99C2A6789264E',
        tokenExpiry: 1 * 30 * 1000 * 60 //1 hour
    },
    email: {
        username: 'infoacademy01@gmail.com',
        password: 'asdqwe12',
        verifyEmailUrl: 'api/verifyLink',
        resetEmailUrl: ''
    }
}