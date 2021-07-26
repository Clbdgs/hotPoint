const Router = require('koa-router')
const router = new Router()
const Animation = require('../models/animation')

router.get('/getAnimations',Animation.getAnimations)
router.get('/getAnimationCode/:id/:name',Animation.getAnimationCode)
router.post('/createAnimation',Animation.createAnimation)
module.exports = router