const  Router =  require('koa-router') 
const File = require('../models/file.js')
const router = new Router()

router.post('/uploadFile',File.addFile)
router.post('/addImg',File.addImg)
router.get('/getFiles',File.getFiles)
router.get('/getMaterial',File.getMaterial)
router.post('/updateFile',File.updateFile)
router.post('/deleteFile',File.deleteFile)
router.post('/getZY',File.getZY)
router.post('/addXlsx',File.addXlsx)
router.get('/getXlsx',File.getXlsx)
router.get('/static/upload/:name',File.downLoad)
router.get('/static/img/:name',File.downLoadImg)
module.exports = router