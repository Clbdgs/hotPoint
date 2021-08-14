const Db = require('../lib/mysqldb.js')

class Login {

    static async login(ctx){
        const params = ctx.request.body
        let sql = `select name from where binary email='${params.email}' and password='${params.password}'`
        const [user] = await Db.execute(sql);
        if(user[0]){
            ctx.response.body ={
                data:user,
                code: 200,
                message: '登录成功'
            }
        }else{
            ctx.response.body ={
                code: 400,
                message: '密码输入错误，请检查'
            }
        }
    }
}

module.exports =  Login;