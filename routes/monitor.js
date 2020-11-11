const {handleError} = require('../controller/monitorController')
const router = require('koa-router')()
router.prefix('/monitor')

router.get('/error/:img', async ctx => {
    handleError(ctx.query)
    ctx.body = 'upload success'
})

module.exports = router