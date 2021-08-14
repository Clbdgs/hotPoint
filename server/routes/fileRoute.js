const  Router =  require('koa-router') 
const File = require('../models/file.js')
const router = new Router()

router.post('/addFile',File.addFile)
router.post('/addImg',File.addImg)
router.post('/getFiles',File.getFiles)
router.get('/getMaterial',File.getMaterial)
router.post('/updateFile',File.updateFile)
router.post('/deleteFile',File.deleteFile)
router.post('/getZY',File.getZY)
router.post('/addXlsx',File.addXlsx)
router.get('/getXlsx',File.getXlsx)
router.get('/static/upload/:name',File.downLoad)
module.exports = router