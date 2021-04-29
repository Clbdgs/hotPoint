const  Router =  require('koa-router') 
const fs = require('fs')
const path = require('path')
const File = require('../models/file.js')
var qs = require('querystring'); 
class Upload{

}

const router = new Router()

router.post('/upload',File.add)

router.get('/files',File.get)

router.get('/static/upload/:name',File.downLoad)

module.exports = router.middleware()