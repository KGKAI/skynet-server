const path = require('path')

module.exports = {
    sourcemapConfig: {
        outputDir: path.resolve(process.cwd(), "sourcemaps")
    },
    databaseConfig: {
        host: 'localhost',
        user: 'root',
        password: '@WSX1qaz',
        database: 'skynet-monitor'
    }
}