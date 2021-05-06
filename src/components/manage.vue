<template>
    <div class="">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-8">
                <form id='fileForm' style="width: 500px;" enctype="application/x-www-form-urlencoded">
                    <!-- application/x-zip-compressed -->
                    <div class="row g-3 mb-3 align-items-center">
                        <div class="col-auto">
                            <label for="inputPassword6" class="col-form-label">包名</label>
                        </div>
                        <div class="col-auto">
                            <input type="input" id="inputPassword6" class="form-control"
                                aria-describedby="passwordHelpInline" placeholder="系统集成项目管理工程师">
                        </div>
                        <div class="col-auto">
                            <span id="passwordHelpInline" class="form-text">
                                Must be 8-20 characters long.
                            </span>
                        </div>
                    </div>
                    <div class="row g-3 mb-3 align-items-center">
                        <div class="col-auto">
                            <label for="inputPassword6" class="col-form-label">简介</label>
                        </div>
                        <div class="col-auto">
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div class="col-auto">
                            <span id="passwordHelpInline" class="form-text">
                            </span>
                        </div>
                    </div>
                    <div class="row g-3 mb-3 align-items-center">
                        <div class="col-auto">
                            <label for="inputPassword6" class="col-form-label">表格上传</label>
                        </div>
                        <div class="col-auto">
                            <input type="file" id="excFile" ref="upload" name="xlsx" value=""
                                accept=".xlsx"> 
                        </div>
                        <div class="col-auto">
                            <span id="passwordHelpInline" class="form-text">
                                <a class="link" @click="handleOpenTemplate">模版</a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
                                </svg>
                                <i class="bi-alarm"></i>
                            </span>
                        </div>
                    </div>
                    <div class="row g-3 mb-3 align-items-center">
                        <div class="col-auto">
                            <label for="package" class="col-form-label">上传包</label>
                        </div>
                        <div class="col-auto">
                            <input type="file" id="file" ref="upload" name="file" accept=".zip">
                        </div>
                    </div>
                    <button class="btn btn-success" type="submit" @click="handleUploadXls">提交</button>
                    <button class="btn btn-success" type="submit" @click="handleUpload">上传文件</button>
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
                files: []
            }
        },
        created() {},
        methods: {
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
</style>
