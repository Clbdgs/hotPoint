const  Db = require('../lib/mysqldb.js')

class Subject{

    static async getSubject(ctx){
        const [ subjects ] = await Db.execute('Select * from SUBJECT');
        ctx.response.body ={
            data: subjects,
            code: 200,
            message: '获取成功'
        }
    }
    
    static async addSubject(ctx){
        const params = ctx.request.body
        var sql = 'INSERT INTO SUBJECT(id,name) VALUES(?,?)';
        var addParams = [params.id,params.name]
        await Db.execute(sql,addParams);
        ctx.response.body ={
            code: 200,
            message: '新增成功'
        }
    }
    static async deleteSubject(ctx){
        var mes = ''
        var code = 0
        var sql = `delete from SUBJECT where id=${ctx.request.body.id}`
        try {
            await Db.execute(sql);
            mes =  '删除成功'
            code = 200
        } catch (error) {
            mes =  '删除失败'
            code = 500
        }
        ctx.response.body ={
            code: code,
            message: mes
        }
    }
}
module.exports =  Subject;