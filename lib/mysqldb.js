const mysql = require('mysql2/promise')

let connectionPool = null;
class MysqlDb{
    constructor(){

    }
    static async execute(sql, values) {
        if (!connectionPool) await setupConnectionPool();

        // const t1 = performance.now();
``
        const [ rows, fields ] =  await connectionPool.execute(sql, values);

        // const t2 = performance.now();
        // debug('execute', `${(t2-t1).toFixed(0).padStart(3, ' ')}ms`, sql.trim().split('\n')[0]+(sql.trim().split('\n').length>1?'...':''), `×${rows.length}`);

        return [ rows, fields ];
    }
    static async connect (){
        const connection = await mysql.createConnection({
            host: 'localhost', 	 	
            user: 'clbdgs',
            password : 'admin123',
            database: 'hot_point'
        });
        const [rows, fields] = await connection.execute('SELECT * FROM topic')
        console.log('+++++',rows[0].TOPIC_NAME)
    }
}

async function setupConnectionPool()  {
    // const t1 = performance.now();
    let dbConfig ={
        host: 'localhost', 	 	
        user: 'root',
        password : '**2Rgkjmig!v',
        database: 'hotpoint'
    }
    // const dbConfig = MysqlDb.connectionParams();
    // dbConfig.namedPlaceholders = true;
    // dbConfig.dateStrings = true;
    connectionPool = mysql.createPool(dbConfig);

    // traditional mode ensures not null is respected for unsupplied fields, ensures valid JavaScript dates, etc
    // await connectionPool.query('SET SESSION sql_mode = "TRADITIONAL"');

    // const t2 = performance.now();
    // debug('connect', `${(t2-t1).toFixed(0).padStart(3, ' ')}ms`, `${dbConfig.host}/${dbConfig.database}`);

    // send regular queries in attempt to fix Azure ETIMEDOUT / ECONNRESET issues - github.com/sidorares/node-mysql2/issues/683
    // if (heartbeat) {
    //     setInterval(async () => {
    //         debug(`keepalive – pool connections all:${connectionPool.pool._allConnections.length} free:${connectionPool.pool._freeConnections.length} queue:${connectionPool.pool._connectionQueue.length}`);
    //         await connectionPool.execute('Select 1');
    //     }, 1000*60*2);
    // }
}

// async function main(){
//     const mysql = require('mysql2/promise')

//     const connection = await mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password : '**2Rgkjmig!v',
//         database: 'hotPoint'
//     });
//     let insertTopic = 'INSERT INTO topic (ID,TOPIC_NAME,CREATED_BY,CREATED_TIME,UPDATED_BY,UPDATED_TIME) VALUES ("1234","热门","jimmy","20210418","jimmy","20210418")'
//     const [rows, fields] = await connection.execute('SELECT * FROM topic')
//     // const [rows, fields] = await connection.execute(insertTopic)
//     console.log('+++++',rows[0].TOPIC_NAME)
// }

module.exports =  MysqlDb;