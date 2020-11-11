const fs = require('fs')
const path = require('path')
const { sourcemapConfig } = require('../config/index')
function writeFile(output, content) {
    let currentPath = sourcemapConfig.outputDir
    let paths = output.split('/')
    let fileName = paths[paths.length - 1]
    // 1. 校验文件是否是map
    if (!/\.map$/.test(fileName)) {
        throw new Error('The upload file must be a map!')
    }

    // 2. 检验目录路径，不存在则创建
    for (let i = 0 ; i < paths.length - 1; i++) {
        // 过滤掉打包目录，只保留真实目录
        if (['dist', 'out', 'build'].indexOf(paths[i]) > -1) {
            continue;
        }
        let checkPath = path.resolve(currentPath, paths[i])
        if (!fs.existsSync(checkPath)) {
            fs.mkdirSync(checkPath)
        }

        currentPath = checkPath
    }

    // 3. 校验目标目录下是否已存在待上传文件, 那就要求打包时必须带上hash
    let targetFile = path.resolve(currentPath, fileName)
    if (fs.existsSync(targetFile)) {
        console.log('待上传文件[%s]已存在，无需上传!', fileName)
        return;
    }

    fs.writeFile(path.resolve(currentPath, paths[paths.length - 1]), content, (error) => {
        if (error) {
            throw new Error(error)
        }
        console.log("[%s]上传成功!", fileName)
    })
}

module.exports = writeFile