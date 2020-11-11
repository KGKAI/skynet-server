const mysql = require('./index')
const query = require('./utils')

async function insert(error) {
    let pool = mysql.getPool()
    let sql = `INSERT INTO error VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        try {
            return await query(pool, sql, [
                null,
                error.trackId, 
                error.uid, 
                error.timestamp, 
                error.type,
                error.deviceInfo.browser.browserName,
                error.deviceInfo.browser.ua,
                error.deviceInfo.os,
                error.pageInfo.screenWidth,
                error.pageInfo.screenHeight,
                error.pageInfo.pageWidth,
                error.pageInfo.pageHeight,
                error.data.message,
                error.data.filename,
                error.data.lineno,
                error.data.colno,
                error.data.stack,
                error.currentUrl,
                error.refererUrl,
                error.app_version,
                error.apiVersion,
                error.appId
            ])
        } catch(e) {
            console.log(e)
            throw e
        }
}

module.exports = {
    insert
}