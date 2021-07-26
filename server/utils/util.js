const service = {
    getCompleteTime:function () {
        let date = new Date()
        let year = date.getFullYear()
        let mon = date.getMonth()+1
        let day = date.getDate()
        let hour = date.getHours()
        let min = date.getMinutes()>=10? date.getMinutes() : '0'+ date.getMinutes()
        let time = year + '-' + mon + '-' + day + '-' + hour + ':' + min
        return time
    }
}
module.exports = service