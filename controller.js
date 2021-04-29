const fs = require('fs');
const upload = require('./controllers/upload')
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            console.log('path'+path);
            router.post(path,mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else{
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router,dir) {
    var files = fs.readdirSync(__dirname + dir);
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });
    for (var f of js_files) {
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')({
            prefix:'/api'
    });
    router.post('/upload', upload.single('avatar'), async (ctx, next) => {
        let imageUrl = 'http://127.0.0.1:4000/images/';
        ctx.body = {
            fileUrl:imageUrl + ctx.req.file.filename
        }
    })
    addControllers(router, controllers_dir);
    return router.routes();
};