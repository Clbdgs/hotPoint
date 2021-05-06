/* eslint no-shadow:off *//* app is already declared in the upper scope */
const Koa = require('koa');
// import Koa  from 'koa'; 

// import cors  from 'koa-cors';  
// import path  from 'path';   
// import bodyParser  from 'bodyParser';   
// import staticFiles  from 'staticFiles';  
const topicRoute = require('./routes/topic.js')
const UploadRoute = require('./routes/upload.js')
const  fs = require('fs');
// var path = require('path');
// let session = require('koa-session');
const  cors = require('koa-cors');
const koaBody  = require('koa-body');
const koaJson2xlsx = require('koa-json2xlsx');

// const logger = require('koa-logger');
const staticFiles  = require('koa-static');
// const controller = require('./controller');
const app = new Koa();


app.use(cors());
app.use(koaBody({
    multipart: true, 
    formidable: {
        maxFieldsSize: 2 * 1024 * 1024, // 最大文件为2兆
        multipart: true // 是否支持 multipart-formdate 的表单
    }   
}));
app.use(koaJson2xlsx());
app.use(UploadRoute);
app.use(topicRoute);


app.use(staticFiles('public'));
// router.get('/', (ctx) => {
//     // 设置头类型, 如果不设置，会直接下载该页面
//     ctx.type = 'html';
//     // 读取文件
//     const pathUrl = path.join(__dirname, '/static/index.html');
//     ctx.body = fs.createReadStream(pathUrl);
// });
// app.use(logger());
// app.use(session(app));
// app.use(controller());
app.use(ctx => {
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
});
app.listen(4999,function(error){
    console.log("server is start , localhost:4999")
});
