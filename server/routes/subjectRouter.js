const Router = require('koa-router')
const router = new Router()
const Subject = require('../models/subject')

router.get('/getSubject',Subject.getSubject)
router.post('/addSubject',Subject.addSubject)
router.post('/deleteSubject',Subject.deleteSubject)
module.exports = router