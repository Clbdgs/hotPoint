const  Router =  require('koa-router') 
const topic = require('../models/topic.js')
const router = new Router();

router.get('/topic',topic.getList)

module.exports = router.middleware()