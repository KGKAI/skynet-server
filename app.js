const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const upload = require('./routes/sourcemap')
const monitor = require('./routes/monitor')
const mysql = require("./model/index");

// 初始化数据库
mysql.init('error')

// error handler
onerror(app)

app.use(koaBody({
  multipart: true,
  formidable: { 
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize: 10 * 1024 * 1024, // 文件上传大小10mb
  }
}))
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(upload.routes(), upload.allowedMethods())
app.use(monitor.routes(), monitor.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
