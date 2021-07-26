const path = require('path');
// import { Configuration } from 'webpack'

/**
 * @type {Configuration}
 */

const config = {
    publicPath: process.env.NODE_ENV === 'development'? '/' : '/',
    outputDir: path.resolve(__dirname,'dist'),
    css:{
        extract: false,
        sourceMap: false
    },
    devServer:{
        host:'localhost',
        port: 8001,
        https: false,
        hotOnly: true,
        // open: true,//自动打开浏览器
        proxy:{
            '/v1':{
                target:"http://localhost:3000",
                changeOrigin: true,
                // secure: false,//如果https接口，配置该参数
                pathRewrite:{ //重写路径
                    '^/v1':"/v1"
                }
            }
        }
    }
}
module.exports = config
