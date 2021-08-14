const Db = require('../lib/mysqldb.js')
const fs = require('fs')
const path = require('path')
const send = require('koa-send');
const xlsx = require('node-xlsx');
const TranslateXlsx = require('./translateXlsx');
const service = require('../utils/util');
const { FILE } = require('dns');
const domain = 'http://clbdgs.xyz'


class File{
    static async getZY(ctx){
       console.log('zy',ctx.request.body.value)
       ctx.response.body ={
         value:ctx.request.body.value,
        code: 200,
        message: '获取成功'
    }
    }
    static readWriteStream(filePath,publicPath,resourcePath){
        let writeStream = null
        let readStream = fs.createReadStream(filePath)
        if(!fs.existsSync(publicPath)){
            console.log('----publicPath',publicPath)
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
    static async addImg(ctx){
        const file = ctx.request.files
        let imgAddress = domain + '/static/image/'
        let fileArray = []
        let fileReader = null
        let writeStream = null
        let fileResource = null
        let imgPathReponse = []
        const filePath = path.join(__dirname, `../../static/image`);
        for (const key in file) {
            fileArray.push([key,file[key]])
        }
        fileArray.forEach(el=>{
            fileReader = fs.createReadStream(el[1].path)         
            fileResource = filePath + `/${el[1].name}`;  
            writeStream = fs.createWriteStream(fileResource);
            fileReader.pipe(writeStream);
            imgPathReponse.push([el[0],imgAddress+ el[1].name])
        })
        if(imgPathReponse){
            ctx.response.body ={
                code: 200,
                data:imgPathReponse,
                message: '上传成功'
            }
        }  
    }

    static async addFile(ctx){
        const params = ctx.request.body
        const file = ctx.request.files.package
        console.log('params',file,params)
        let materialUrl = domain + '/static/material/'
        let fileId = 0
        let  writeStream = null;
        let time = service.getCompleteTime()
        var  addSql = 'INSERT INTO FILE(name,des,type,subjectId,catalogueId,content,render,status,created_time) VALUES(?,?,?,?,?,?,?,?,?)';
        var addSqlParams = [params.name,params.des,params.type,params.subjectId,params.catalogueId,params.content,params.render,params.status,time]
        const [ row ] = await Db.execute(addSql,addSqlParams)
        
        fileId = row.insertId
        if(file){
            const file = ctx.request.files.package
            const fileReader = fs.createReadStream(file.path)  // 创建可读流
            const filePath = path.join(__dirname, `../../static/material`);
            const fileResource = filePath + `/${file.name}`;
            //判断是否存在static/upload路径，无则新建路径
            writeStream = fs.createWriteStream(fileResource);
            fileReader.pipe(writeStream);
            var  addMaterialSql = 'INSERT INTO MATERIAL(fileId,name,url) VALUES(?,?,?)';
                var sqlParams = [fileId,file.name,materialUrl+file.name]
                Db.execute(addMaterialSql,sqlParams)
        }
        if(row){
            ctx.response.body ={
                code: 200,
                message: '上传成功'
            }
        }
    }
    static async getFiles(ctx){
        const params = ctx.request.body
        let sql = ''
        if(!params.type){
            sql = 'Select * from FILE'
        }else{
            sql = `Select * from FILE where type=${params.type}`
        }
        const [ files ] = await Db.execute(sql);
        ctx.response.body ={
            data : files,
            code: 200,
            message: '获取成功'
        }
    }
    static async getMaterial(ctx){
        let sql = `Select * from MATERIAL where fileId='${ctx.request.query.id}'`
        const [ materials ] = await Db.execute(sql);
        ctx.response.body ={
            data : materials,
            code: 200,
            message: '获取成功'
        }
    }
    static async updateFile(ctx){            
        let sql = `update FILE set status=${ctx.request.body.status} where id='${ctx.request.body.id}'`
        const [ files ] = await Db.execute(sql);
        ctx.response.body ={
            files : files,
            code: 200,
            message: '更新成功'
        }
    }
    static async deleteFile(ctx){
        let sql = `delete from FILE where id='${ctx.request.body.id}'`
        const [ files ] = await Db.execute(sql);
        ctx.response.body ={
            files : files,
            code: 200,
            message: '删除成功'
        }
    }
    static async downLoad(ctx){
        const name = ctx.params.name;
        const path = `../../static/material/${name}`;
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