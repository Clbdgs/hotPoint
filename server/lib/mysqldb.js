const mysql = require('mysql2/promise')

let connectionPool = null;
class MysqlDb{
    constructor(){

    }
    static async execute(sql, values) {
        if (!connectionPool) await setupConnectionPool();

        // const t1 = performance.now();
        const [ rows, fields ] =  await connectionPool.execute(sql, values);

        // const t2 = performance.now();
        // debug('execute', `${(t2-t1).toFixed(0).padStart(3, ' ')}ms`, sql.trim().split('\n')[0]+(sql.trim().split('\n').length>1?'...':''), `×${rows.length}`);

        return [ rows, fields ];
    }
    static async query(sql, values) {
        if (!connectionPool) await setupConnectionPool();
        const [ rows, fields ] =  await connectionPool.query(sql, values);
        return [ rows, fields ];
    }
}

async function setupConnectionPool()  {
    // const t1 = performance.now();
    let dbConfig ={
        host: 'localhost', 	 	
        user: 'root',
        password : '',
        database: 'hotpoint'
    }
    connectionPool = mysql.createPool(dbConfig);

}

module.exports =  MysqlDb;