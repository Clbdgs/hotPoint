const Db = require('../lib/mysqldb.js')
const fs = require('fs')
const path = require('path')
const send = require('koa-send');
const xlsx = require('node-xlsx');
const TranslateXlsx = require('./translateXlsx');
const uploadUrl = "http://localhost:4999/static/upload/";
class File{

    static async add(ctx){
        const params = ctx.request.body
        const file = ctx.request.files.package
        const fileReader = fs.createReadStream(file.path)  // 创建可读流
        const filePath = path.join(__dirname, '../static/upload');
        const fileResource = filePath + `/${file.name}`;
        let  writeStream = null;
        //判断是否存在static/upload路径，无则新建路径
        if(!fs.existsSync(filePath)){
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
        var  addSql = 'INSERT INTO file(Id,name,url,content,status,des) VALUES(?,?,?,?,?,?)';
        var addSqlParams = [new Date(),params.name,uploadUrl+file.name,params.render,params.status,params.des]
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
            code: 200,
            message: '获取成功'
        }
    }
    static async downLoad(ctx){
        const name = ctx.params.name;
        const path = `static/upload/${name}`;
        ctx.attachment(path);
        await send(ctx, path);
    }
    static async addXlsx(ctx){
        const file = ctx.request.files.xlsx
        const fileReader = fs.createReadStream(file.path)  // 创建可读流
        const filePath = path.join(__dirname, '../static/upload');
        const fileResource = filePath + `/${file.name}`;
        let  writeStream = null;
        //判断是否存在static/upload路径，无则新建路径
        if(!fs.existsSync(filePath)){
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
        ctx.response.body ={
            code: 0,
            message: '上传成功'
        }
    }
    static async getXlsx(ctx){
        const path = 'static/upload/模版.xlsx';
        const translateXlsx = new TranslateXlsx()
        let table =[]
        const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(path));
        workSheetsFromBuffer.forEach(item=>{
            translateXlsx.parseSheet(item)
        });
        ctx.response.body ={
            data: translateXlsx.tableArray,
            code: 0,
            message: '上传成功'
        }
    }    
}

module.exports = File