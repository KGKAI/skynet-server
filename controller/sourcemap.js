const fs = require('fs')
const { SourceMapConsumer } = require('source-map')

async function parseError(pathname, lineno, colno) {
    try {
        if (!pathname) return {}
        if (!fs.existsSync(pathname)) return {}
        let fileSourceMap = JSON.parse(fs.readFileSync(pathname), 'utf8')
        const consumer = await new SourceMapConsumer(fileSourceMap)
        let pos = consumer.originalPositionFor({
            line: +lineno,
            column: +colno
        })
        return pos
    } catch (error) {
        console.log('解析sourcemap失败，', error)
        throw error
    }
}

module.exports = {
    parseError
}
