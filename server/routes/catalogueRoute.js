const Router = require('koa-router')
const router = new Router()
const Catalogue = require('../models/catalogue')

router.post('/add',Catalogue.add)
router.get('/get',Catalogue.get)
router.post('/delete',Catalogue.delete)
module.exports = router