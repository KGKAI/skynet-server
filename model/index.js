const mysql = require('mysql')
const {databaseConfig} = require('../config')
const query = require('./utils')
const pool = mysql.createPool(databaseConfig)

class MySQL {
    async init(tb) {
        let sql = `CREATE TABLE IF NOT EXISTS ${tb} (
            id INT(10) NOT NULL AUTO_INCREMENT,
            track_id VARCHAR(20) NOT NULL,
            uid INT(10),
            timestamp VARCHAR(30) NOT NULL,
            type VARCHAR(10) NOT NULL,
            browser_name VARCHAR(10) NOT NULL,
            ua VARCHAR(255) NOT NULL,
            os VARCHAR(20) NOT NULL,
            screen_width INT(5) NOT NULL,
            screen_height INT(5) NOT NULL,
            page_width INT(5) NOT NULL,
            page_height INT(5) NOT NULL,
            message VARCHAR(255) NOT NULL,
            filename VARCHAR(100) NOT NULL,
            lineno INT(8) NOT NULL,
            colno INT(8) NOT NULL,
            stack VARCHAR(1000) NOT NULL,
            current_url VARCHAR(255) NOT NULL,
            referer_url VARCHAR(255) NOT NULL,
            app_version VARCHAR(20),
            api_version VARCHAR(20),
            app_id VARCHAR(20),
            PRIMARY KEY (id)
        );`.replace(/[\r\n]/g, '')
        try {
            await query(pool, sql)
        } catch(error) {
            console.log(error)
        }
    }

    getPool() {
        return pool
    }
}

module.exports = new MySQL()