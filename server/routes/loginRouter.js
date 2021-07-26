const Router = require('koa-router')
const router = new Router()
const Login = require('../models/login')

router.post('/',Login.login)

module.exports = router