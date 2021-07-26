const  Db = require('../lib/mysqldb.js')
const fs = require('fs')
const path = require('path')
const send = require('koa-send');
class Animation{

    static async getAnimations(ctx){
        const [ animations ] = await Db.execute('Select id,des,name,imgUrl from ANIMATION');
        ctx.response.body ={
            data: animations,
            code: 200,
            message: '获取成功'
        }
    }
    static async getAnimationCode(ctx){
        const id = ctx.params.id;
        const name = ctx.params.name;
        const path = `static/animation/${name}.html`;
        ctx.attachment(path);
        await send(ctx, path);
    }
    static async createAnimation(ctx){
        let params = ctx.request.body
        let code = ctx.request.files.animationCode
        let img = ctx.request.files.animationImg
        let url = `http://localhost:3000/static/image`;
        let filePath = path.join(__dirname, `../static/animation`);
        let codeResource = filePath + `/${code.name}`
        let imgResource = filePath + `/${img.name}`
        Animation.readWriteStream(code.path,filePath,codeResource)
        Animation.readWriteStream(img.path,filePath,imgResource)
        var  addSql = 'INSERT INTO ANIMATION(name,des,imgUrl,codeUrl) VALUES(?,?,?,?)';
        var addSqlParams = [params.animationName,params.animationDes,url+img.name,url+code.name]
        const [ row ] = await Db.execute(addSql,addSqlParams)
        if(row){
            ctx.response.body ={
                code: 200,
                message: '上传成功'
            }
        }
    }
    static readWriteStream(filePath,publicPath,resourcePath){
        let writeStream = null
        let readStream = fs.createReadStream(filePath)
        if(!fs.existsSync(publicPath)){
            fs.mkdir(publicPath,(err)=>{
                if(err){
                    throw new Error(err)
                }else{
                    console.log('create file and write Stream')
                    writeStream = fs.createWriteStream(resourcePath);
                    readStream.pipe(writeStream);
                }
            })
        }else{
            writeStream = fs.createWriteStream(resourcePath);
            readStream.pipe(writeStream); // 可读流通过管道写入可写流
        }
    }
}
module.exports =  Animation;