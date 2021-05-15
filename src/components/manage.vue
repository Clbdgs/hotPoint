<template>
    <div class="manage-page">
        <div class="row">
            <div class="col-2 nav">
                <ul>
                    <li>
                        资料管理
                    </li>
                </ul>
            </div>
            <div class="col-8">
                <form id='fileForm' class="row g-3" enctype="application/x-www-form-urlencoded">
                    <div v-show="step">
                        <div class="row mb-3">
                            <div class="col-auto">
                                <label for="name" class="col-form-label fw-bold">名称</label>
                                <input type="input" id="formName" name="name" class="form-control"
                                placeholder="请输入名称">
                            </div>
                            <div class="col-auto" style="position: relative;">
                                <label for="package" class="col-form-label fw-bold">资源</label>
                                <input type="text" class="form-control" v-model='fileName' placeholder="点击上传">
                                <input type="file" class="fileInput"  id="formPackage" ref="upload" name="package" accept=".zip">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-5">
                                 <label for="des" class="col-form-label fw-bold">简介</label>
                                <textarea class="form-control" id="formTextarea" name="des" rows="3"></textarea>
                            </div>
                        </div>
                        <!-- <div class="row g-3 mb-3 align-items-center">
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
                        </div> -->
                        </div>
                     <div v-if="!step">
                        <div  class="row mb-3 mavon-editor">
                            <mavon-editor
                                v-model="editorValue"
                                :toolbars='editorToolConfig'
                                style="height: 100%;"
                                ref=md
                                fontSize="16px"
                                :boxShadow="true"
                                >
                            </mavon-editor>
                        </div>
                    </div>
                </form>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-primary" @click="handleNext">{{step? '下一步' : '上一步'}}</button>
                    <button v-if="!step" class="btn btn-success ms-4" @click="handleSaveFile('1')">保存</button>
                    <button v-if="!step" class="btn btn-secondary ms-4" @click="handleSaveFile('0')">草稿</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import editConfig from './editMavonConfig.js'
    export default {
        data() {
            return {
                fileName :'',
                step:true,
                editorValue:'',
                editorToolConfig:{}
            }
        },
        created() {
            this.$store.state.footer = false
        },
        mounted(){
            this.editorToolConfig =  editConfig
        },
        methods: {
            handleNext(){
                this.step = !this.step 
            },
           handleSaveFile(type){
                let form = document.querySelector("#fileForm");
                let render = this.$refs.md.d_render
                let fromData = new FormData(form);
                fromData.set('render',render)
                fromData.set('status',type? '1':'0')
            //    let fileParam = {
            //        name:params.name,
            //        desc:params.desc,
            //        cover:params.cover,
            //        content:params,
            //        status:params.status
            //    }
                this.$http.post('http://localhost:4999/upload', fromData).then(res => {
                    console.log('--------', res)
                })
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
.nav{
    background-color: #eee;
    padding:10px 0;
    margin-right: 20px;
    max-height: 300px;
}
.fileInput{
    opacity: 0;
    position: absolute;
    bottom:0;
    left:0;
    width: 200px;
}
.mavon-editor{
    height:500px;
}
</style>
