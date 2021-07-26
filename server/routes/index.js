const catalogue = require('./catalogueRoute')
const fileRouter = require('./fileRoute')
const animationRouter = require('./animationRouter')
const loginRouter = require('./loginRouter')
const subjectRouter = require('./subjectRouter')
const Router = require('koa-router')

const router = new Router()

router.use('/v1/catalogue',catalogue.routes(),catalogue.allowedMethods())
router.use('/v1/file',fileRouter.routes(),fileRouter.allowedMethods())
router.use('/v1/animation',animationRouter.routes(),animationRouter.allowedMethods())
router.use('/v1/login',loginRouter.routes(),loginRouter.allowedMethods())
router.use('/v1/subject',subjectRouter.routes(),subjectRouter.allowedMethods())

module.exports = router
