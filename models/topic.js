const  Db = require('../lib/mysqldb.js')

class Topic{
    static async getList(ctx){
        const [ topics ] = await Db.execute('Select * From topic');
        ctx.body = topics
        return topics;
    }
    
    async insert(values){
        
    }
    async update(id,values){
        
    }
    async delete(id){
        
    }
}

module.exports =  Topic;
