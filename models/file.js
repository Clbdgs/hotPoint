const Db = require('../lib/mysqldb.js')
const fs = require('fs')
const path = require('path')
const send = require('koa-send');
const uploadUrl = "http://localhost:3000/static/upload/";
class File{
    static async add(ctx){
        const file = ctx.request.files.file
        const fileReader = fs.createReadStream(file.path)  // 创建可读流
        const filePath = path.join(__dirname, '../static/upload');
        const fileResource = filePath + `/${file.name}`;
        let  writeStream = null;
        //判断是否存在static/upload路径，无则新建路径
        if(!fs.existsSync(filePath)){
            console.log('filePath',filePath)
            fs.mkdir(filePath,(err)=>{
                if(err){
                    throw new Error(err)
                }else{
                    console.log('create file and write Stream')
                    writeStream = fs.createWriteStream(fileResource);
                    fileReader.pipe(writeStream);
                }
            })
        }else{
            writeStream = fs.createWriteStream(fileResource);
            fileReader.pipe(writeStream); // 可读流通过管道写入可写流
        }
        
        var params = {
            name : file.name,
            subject:"计算机",
            url : fileResource
        }
        var  addSql = 'INSERT INTO file(Id,name,subject,url) VALUES(?,?,?,?)';
        var addSqlParams = [new Date(),params.name,params.subject,uploadUrl+params.name]
        const [ row ] = await Db.execute(addSql,addSqlParams)
        if(row){
            ctx.response.body ={
                url : uploadUrl+`/${file.name}`,
                code: 0,
                message: '上传成功'
            }
        }
    }
    static async get(ctx){
        const [ files ] = await Db.execute('Select * From file');
        ctx.response.body ={
            files : files,
            code: 0,
            message: '获取成功'
        }
    }
    static async downLoad(ctx){
        const name = ctx.params.name;
        const path = `static/upload/${name}`;
        ctx.attachment(path);
        await send(ctx, path);
    }
}


module.exports = File