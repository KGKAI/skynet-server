const URL = require('url')
const path = require('path')
const {sourcemapConfig} = require('../config/index')

/**
 * 根据请求传入的filename，解析出服务器上map文件实际的地址
 * @param {*} source 
 */
function parseFilename(source) {
    try {
        if (!source) return ""
        let url = URL.parse(source)
        let filename = sourcemapConfig.outputDir + url.pathname + '.map'
        return path.resolve(process.cwd(), filename)
    } catch(error) {
        console.log("解析文件地址失败: ", error)
    }
}

module.exports = {
    parseFilename
}