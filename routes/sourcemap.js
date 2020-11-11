const router = require('koa-router')()
const writeFile = require('../src/file')

router.prefix('/sourcemap')

router.post('/upload', async ctx => {
  const { content, fileName } = ctx.request.body
  writeFile(fileName, content)
  ctx.body = 'upload success!'
})


module.exports = router
