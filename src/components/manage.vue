<template>
    <div class="manage-page">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-">
                <form id='fileForm' enctype="application/x-www-form-urlencoded">
                    <!-- application/x-zip-compressed -->
                    <div class="row g-3 mb-3 align-items-center">
                        <div class="col-auto">
                            <label for="inputPassword6" class="col-form-label">类型</label>
                        </div>
                        <div class="col-5">
                            <select class="form-select" aria-label="Default select example">
                                <option selected value="1">卡片</option>
                                <option value="2">包</option>
                            </select>
                        </div>
                    </div>
                    <div class="row g-3 mb-3 align-items-center">
                        <div class="col-auto">
                            <label for="inputPassword6" class="col-form-label">包名</label>
                        </div>
                        <div class="col-5">
                            <input type="input" id="inputPassword6" class="form-control"
                                aria-describedby="passwordHelpInline" placeholder="系统集成项目管理工程师">
                        </div>
                    </div>
                    <div class="row g-3 mb-3 align-items-center">
                        <div class="col-auto">
                            <label for="inputPassword6" class="col-form-label">简介</label>
                        </div>
                        <div class="col-5">
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div class="col-auto">
                            <span id="passwordHelpInline" class="form-text">
                            </span>
                        </div>
                    </div>
                    <div class="row g-3 mb-3 align-items-center">
                        <div class="col-auto">
                            <label for="inputPassword6" class="col-form-label">表格</label>
                        </div>
                        <div class="col-auto" style="position: relative;">
                            <input type="text" class="form-control" v-model='fileName' placeholder="点击上传">
                            <input class="fileInput" type="file" id="excFile" ref="upload" name="xlsx" @change="handleChangeFile"
                                accept=".xlsx"> 
                        </div>
                        <div class="col-auto">
                            <span id="passwordHelpInline" class="form-text">
                                <a class="" @click="handleOpenTemplate" style="cursor: pointer;">上传模版</a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
                                </svg>
                                <i class="bi-alarm"></i>
                            </span>
                        </div>
                    </div>
                    <div class="row g-3 mb-3 align-items-center">
                        <div class="col-auto">
                            <label for="package" class="col-form-label">资源</label>
                        </div>
                        <div class="col-auto" style="position: relative;">
                            <input type="text" class="form-control" v-model='fileName' placeholder="点击上传">
                            <input type="file" class="fileInput"  id="file" ref="upload" name="file" accept=".zip">
                        </div>
                    </div>
                    <div class="d-grid gap-2 mx-auto">
                        <button  class="btn btn-success" type="submit" @click="handleUploadXls">提交</button>
                    </div>
                </form>
            </div>
        </div>
        <ul>
            <template v-for="file in files">
                <li :key="file.name">
                    <a @click="downLoad(file)">{{file.name}}</a>
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                files: [],
                fileName :''
            }
        },
        created() {},
        methods: {
            handleChangeFile(){
                // let value = ev.target.value.split('.')[0]
                // let index = ev.target.value.indexOf('.')
                // console.log('ev',ev.target.value)
                // this.fileName = name
            },
            handleUpload() {
                var form = document.querySelector("#fileForm");
                // console.log('--------',new FormData(document.getElementById('fileForm')[0]))
                // this.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                let fromData = new FormData(form);
                console.log('------file',fromData)
                this.$http.post('http://localhost:4999/upload', fromData).then(res => {
                    console.log('--------', res)
                })
            },
            handleUploadXls(){
                var form = document.querySelector("#fileForm");
                let fromData = new FormData(form);
                this.$http.post('http://localhost:4999/addXlsx', fromData).then(res => {
                    console.log('--------', res)
                })
            },
            handleOpenTemplate(){
                let url = "http://localhost:3000/static/upload/模版.xlsx"
                window.open(url)
            }
        }
    }
</script>
<style lang='scss' scoped>
#passwordHelpInline .link{
    color: #333;
}
.manage-page{
    margin-top: 20px;
}
.fileInput{
    opacity: 0;
    position: absolute;
    top:0;
    left:0;
    width: 200px;
}
</style>
