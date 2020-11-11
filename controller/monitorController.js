const moment = require('moment')

const {insert} = require('../model/errorModel')
const {parseError} = require('./sourcemap')
const {parseFilename} = require('../utils/index')
const ErrorSchema = require('../schema/errorSchema')

async function handleError(data) {
    try {
        let {
            uid, trackId, timestamp, browserName, type, ua, os, pageWidth, pageHeight, screenWidth, screenHeight, currentUrl, refererUrl, message, lineno, colno, filename, stack
        } = data
        // 1. 限制stack的长度
        if (stack && stack.length > 1000) {
            stack = stack.substr(0, 1000)
        }
        // 2. 转换timestamp
        if (timestamp) {
            timestamp = moment(+timestamp).format("YYYY-MM-DD HH:mm:ss")
        }

        // 3. 解析sourcemap
        let path = parseFilename(filename)
        const oriErrorInfo = await parseError(path, lineno, colno)
        const foundSourceMap = Object.keys(oriErrorInfo).length === 0 ? false : true

        // 4. 插入表
        let error = new ErrorSchema({
            uid: 1, trackId: '111111', timestamp, type, ua, os,  currentUrl, refererUrl,
            deviceInfo:{
                browser: {
                    browserName,
                    ua
                },
                os
            },
            pageInfo: {
                pageWidth, 
                pageHeight, 
                screenWidth, 
                screenHeight
            },
            data: {
                message,
                filename: filename,
                lineno: foundSourceMap ? oriErrorInfo.line : lineno,
                colno: foundSourceMap ? oriErrorInfo.column : colno,
                stack
            }
        })

        insert(error)
    } catch (error) {
        console.log('上传失败：error:', error)
        throw error
    }
}

module.exports = {
    handleError
}