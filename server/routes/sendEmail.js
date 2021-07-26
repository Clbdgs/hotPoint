const ses = require('node-ses')
const  Router =  require('koa-router') 
client = ses.createClient({key: 'AKIAYKWC7YOLDDJYDB7C', secret: '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'});

const router = new Router()
function sendEmail(ctx){
    const ctxx = ctx
    console.log('in----')
    client.sendEmail({
        to: '506433977@qq.com'
      , from: 'dakjim@163.com'
    //   , cc: 'theWickedWitch@nerds.net'
    //   , bcc: ['canAlsoBe@nArray.com', 'forrealz@.org']
      , subject: 'greetings'
      , message: 'your <b>message</b> goes here'
      , altText: 'plain text'
     }, function (err, data, res) {
        ctxx.response.body = {
            message: '发送成功'
        }
     });
 }
//  router.post('/sendEmail',sendEmail)
//  module.exports = router.middleware()