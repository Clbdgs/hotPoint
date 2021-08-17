/* eslint no-shadow:off *//* app is already declared in the upper scope */
const Koa = require('koa');
const router = require('./routes')
const  fs = require('fs');
let session = require('koa-session');
const  cors = require('koa-cors');
const koaBody  = require('koa-body');
const logger = require('koa-logger');
const Moment = require("moment");
const serve  = require('koa-static');
const app = new Koa();

app.keys = ['some secret hurr'];
const CONFIG = {
   key: 'koa:sess',   //cookie key (default is koa:sess)
   maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
   overwrite: true,  //是否可以overwrite    (默认default true)
   httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
   signed: true,   //签名默认true
   rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
   renew: false,  //(boolean) renew session when session is nearly expired,
};

app.use(session(CONFIG, app));

app.use(logger((str, args) => {
    // redirect koa logger to other output pipe
    // default is process.stdout(by console.log function)node 
    console.log(Moment().format('YYYY-MM-DD HH:mm:ss')+str);
}))

app.use(async (ctx, next) => {
    await next();
});
  
app.use(serve(__dirname +"../static"));

app.use(cors());
app.use(koaBody({
    multipart: true, 
    formidable: {
        maxFieldsSize: 2 * 1024 * 1024, // 最大文件为2兆
        multipart: true // 是否支持 multipart-formdate 的表单
    }   
}));
app.use(router.routes());
app.use(router.allowedMethods());
// router.get('/', (ctx) => {
//     // 设置头类型, 如果不设置，会直接下载该页面
//     // ctx.type = 'html';
//     // // 读取文件
//     // const pathUrl = path.join(__dirname, '/static/index.html');
//     // ctx.body = fs.createReadStream(pathUrl);

// });

app.listen(3000,function(error){
    console.log("server is start , localhost:3000")
});
