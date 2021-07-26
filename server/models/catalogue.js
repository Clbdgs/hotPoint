const Db = require('../lib/mysqldb.js')

class Catalogue {

    static async add(ctx){
        let values = []
        const params = ctx.request.body
        params.forEach(el => {
            values.push([el.id,el.name,el.isHidden,el.parentId,el.sort]) 
        });
        console.log('values',values)
        var sql = "INSERT INTO CATALOGUE(`id`,`name`,`isHidden`, `parentId`,`sort`) VALUES ?"
        const [ row ] = await Db.query(sql,[values])
        if(row){
            ctx.response.body ={
                code: 200,
                message: '上传成功'
            }
        }

    }
    static async get(ctx){
        let sql = 'Select * from CATALOGUE'
        const [ catalogueList ] = await Db.execute(sql)
        ctx.response.body ={
            code: 200,
            data:catalogueList,
            message: '获取成功'
        }
    }
    static async delete(ctx){
        console.log('id-------',ctx.request.body)
        let sql = `delete from CATALOGUE where id='${ctx.request.body.id}'`
        await Db.execute(sql);
        ctx.response.body ={
            code: 200,
            message: '删除成功'
        }
    }
}

module.exports =  Catalogue;