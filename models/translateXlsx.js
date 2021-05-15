class TranslateXlsx {

    constructor(){
        this.tableArray = []
    }
    parseSheet(sheet) {
        let { data, name } = sheet;
        let thArray = []
        data.forEach((row, rowIndex) => {
            if(Array.prototype.isPrototypeOf(row) && row.length != 0){
                let tableObj = {}
                row.forEach((col, colIndex) => {
                    // 第一行，文件名
                        if (rowIndex === 0) {
                            thArray.push(col)
                        }
                        if(rowIndex >=1){
                            tableObj[thArray[colIndex]] = col
                        }
                });
                if(Object.keys(tableObj).length>0){
                    this.tableArray.push(tableObj)
                }
            }
        });
    }
}
module.exports = TranslateXlsx