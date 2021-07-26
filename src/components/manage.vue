<template>
    <div class="manage-page">
        <div class="nav">
            <ul class="nav-manage">
                <template v-for="item in manageMenuList">
                    <li :key="item.id" class="mb-2" @click="active=item.id">
                        {{item.name}}
                    </li>
                </template>
            </ul>
        </div>
        <div class="main ms-4">
            <div v-if="active ===1">
                <button class="btn btn-success mb-2" @click="handleAddCatalogue">新增目录</button>
                <button class="btn btn-success mb-2 ms-2" @click="handleSubmit">提交</button>
                <div v-for="node in cataList" :key='node.id' >
                    <div class="d-inline-flex align-items-center mt-2">
                        <i class="node-arrow" :class="{'show':node.isHidden}" @click="handleCollapse(node)"></i>  
                        <catalogue-List :node="node" @updateCatalogue='updateCatalogue'></catalogue-List>
                    </div>
                    <div v-if="node.children.length > 0 && node.isHidden" class="second-node mt-2 ms-4">
                        <template v-for="second in node.children" >
                            <catalogue-List  class="mt-1" :key='second.id' :node="second" @updateCatalogue='updateCatalogue'></catalogue-List>
                        </template>
                    </div>
                </div>          
            </div>
            <div v-if="active==2">
                <nav v-if="isCreated" style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item" @click="isCreated=false">
                            <a href="javascript:void()">资料管理</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">编辑</li>
                    </ol>
                </nav>
                <button v-if="!isCreated" type="button" class="btn btn-primary btn-sm mb-4" @click="createFile">创建</button>
                <table v-if="!isCreated" class="table table-striped">
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>状态</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item,index in files" :key="index">
                            <th>{{item.name}}</th>
                            <th>{{item.status=='1'? '已发布' : '草稿'}}</th>
                            <th>{{item.created_time}}</th>
                            <th>
                                <button v-if="item.status=='0'" class="btn btn-primary btn-sm" @click="handleUpdateFile('1')">发布</button>
                                <button class="btn btn-primary btn-sm ms-2" @click="handleEdit(item)">编辑</button>
                                <button class="btn btn-primary btn-sm ms-2" @click="handleDeleteFile(item)">删除</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <div v-else>
                    <form id='fileForm' class="row g-3 w-100" enctype="application/x-www-form-urlencoded">
                        <div v-show="isNextStep">
                            <div class="row">
                                <label for="name" class="col-form-label fw-bold">名称</label>
                                <input type="input" id="formName" v-model="form.name" name="name" class="form-control"
                                placeholder="请输入名称">
                            </div>
                            <div class="row" style="position: relative;">
                                <label for="subject" class="col-form-label fw-bold">科目</label>
                                <select class="form-select" name="subject"  @change="handleSelectSub">
                                    <option v-for="sub,index in subjects"  :key="index" :value="sub.name">{{sub.name}}</option>
                                </select>
                            </div>
                            <div class="row">
                                <div class="col-6" style="padding-left:0">
                                    <label class="col-form-label fw-bold"><a class="ms-2" @click="handleAddSubject">新增科目</a></label>
                                    <label class="col-form-label fw-bold"><a class="ms-2" @click="handleDeleteSubject">删减科目</a></label>
                                    <input type="text" class="form-control" v-model="subjectValue">
                                </div>
                                <div class="col-6 d-flex">
                                </div>
                            </div>
                            <div class="row" style="position: relative;">
                                <label for="catalogue" class="col-form-label fw-bold">目录</label>
                                <select class="form-select" name="catalogue"  @change="handleSelectcatalogue">
                                    <option v-for="catalogue,index in ctlChildOption"  :key="index" :value="catalogue.name">{{catalogue.name}}</option>
                                </select>
                            </div>
                            <div class="row" style="position: relative;">
                                <label for="package" class="col-form-label fw-bold">资源</label>
                                <!-- <input type="text" :title="form.fileName" class="form-control" v-model='form.fileName' placeholder="点击上传"> -->
                                <input type="file" class="form-control" multiple="multiple" id="formPackage" ref="upload" name="package" accept=".doc,.docx,.xls,.xlsx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
                            </div>
                            <div class="row">
                                <label for="des" class="col-form-label fw-bold">简介</label>
                                <textarea class="form-control" id="formTextarea"  v-model="form.des" name="des" rows="3"></textarea>
                            </div>
                        </div>
                        <div v-if="!isNextStep">
                            <div  class="row mavon-editor">
                                <mavon-editor 
                                    :toolbars='editorToolConfig'
                                    v-model="form.content"
                                    style="height: 100%;"
                                    ref=md
                                    @imgAdd="handleAddImg"
                                    name="content"
                                    fontSize="16px"
                                    :boxShadow="true"
                                    >
                                </mavon-editor>
                            </div>
                        </div>
                        <div class="d-flex mt-3">
                            <button type="button" class="btn btn-primary btn-sm" @click="handleNext">{{isNextStep? '下一步' : '上一步'}}</button>
                            <button v-if="!isNextStep" type="button" class="btn btn-success btn-sm ms-4" @click="handleSaveFile('1')">发布</button>
                            <button v-if="!isNextStep" type="button" class="btn btn-secondary btn-sm ms-4" @click="handleUpdateFile('0')">草稿</button>
                        </div>
                    </form>
                </div> 
            </div>
            <div  v-if="active==3">
                <form id="animationForm" class="w-50">
                    <div class="row mb-3">
                        <label for="animationName" class="col-form-label fw-bold">动画名</label>
                        <input type="text" class="form-control" name="animationName">
                    </div>
                    <div class="row mb-3">
                        <label for="animationDes" class="col-form-label fw-bold">描述</label>
                        <textarea class="form-control"  name="animationDes" rows="3"></textarea>
                    </div>
                    <div class="row mb-3">
                        <label for="animationImg" class="col-form-label fw-bold">图片</label>
                        <input type="file" class="form-control"  name="animationImg" accept=".jpg,.png,.gif,.jpeg,.bmp">
                    </div>
                    <div class="row mb-3">
                        <label for="animationCode" class="col-form-label fw-bold">代码</label>
                        <input type="file" class="form-control" name="animationCode" accept=".html">
                    </div>
                    <div class="row col-6">
                        <button class="btn btn-primary"  @click="createAnimation">提交</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import editConfig from './editMavonConfig.js'
import catalogueList from './catalogueList.vue'
    export default {
        components:{
            'catalogueList':catalogueList
        },
        data() {
            return {  
                active:1,
                manageMenuList:[
                    {id:1,name:"目录列表"},
                    {id:2,name:"资料管理"},
                    {id:3,name:"添加动画"}
                ],
                cataList:[
                    {
                        id: "" || new Date().getTime(),
                        name:"",
                        isHidden:1,
                        children:[],
                        parentId:0,
                        sort:1,
                    }
                ],
                ctlChildOption:[],
                cacheCataList:[],//缓存目录列表，提交数据时做差异性比对
                form:{
                    id:'',
                    fileName:"",
                    content:"",
                    subject:{
                        id:0,
                        value:''
                    },
                    catalogueId:0
                },
                isNextStep:false,
                editorToolConfig:{
                   
                },
                files: [],
                img_file:{},
                subjects:[],
                subjectValue:'',
                isCreated:false,
                isAnimation:true,
            }
        },
        created() {
            if(!this.$store.state.isLogin){
                this.$router.push({name:'login'})
            }
        },
        mounted(){
            this.getCatalogueList()
            this.getFiles()
            this.getSubjects()
            this.editorToolConfig =  editConfig
        },
        methods: {
            updateCatalogue(){
                this.$forceUpdate()
            },
            getCatalogueList(){
                this.$http.get(this.INTERFACE.getCatalogueList).then(res=>{
                    if(res.data.code==200){
                        if(res.data.data){ 
                            this.cacheCataList = res.data.data
                            this.ctlChildOption = res.data.data.filter((el)=> {
                                return el.parentId!==0
                            })
                            this.form.catalogueId = this.ctlChildOption[0].id
                            let catalogueList = []
                            res.data.data.forEach(item=>{
                                if(!item.parentId){
                                    item.children = []
                                    catalogueList.push(item)
                                }else{
                                    let obj = catalogueList.find(el=>el.id===item.parentId)
                                    obj.children.push(item)
                                }
                            })
                            this.cataList = catalogueList
                        }
                    }
                })
            },
            handleSubmit(){
                var _this = this
                let paramsArray = []
                function df(list){
                    list.forEach((item)=>{
                        let result = _this.cacheCataList.find(el=>el.id===item.id)
                        //插入新数据
                        if(!result) {
                            paramsArray.push({
                                id:item.id,
                                name:item.name,
                                isHidden:item.isHidden? item.isHidden : 0,
                                parentId:item.parentId,
                                sort:item.sort
                            }) 
                        }
                        
                        if(item.children && item.children.length>0){
                            df(item.children)
                        }
                    })
                }
                df(this.cataList)
                this.$http.post(this.INTERFACE.catalogueList,paramsArray).then(res=>{
                    if(res.data.code==200){
                        console.log(res)
                    }
                })
            },
            handleCollapse(node){
                node.isHidden = ! node.isHidden
            },
            handleAddCatalogue(){
                let newNode = {
                    id: new Date().getTime(),
                    name:"",
                    children:[],
                    isHidden:0,
                    parentId:0,
                    sort:this.cataList.length+1,
                }
                this.cataList.push(newNode)
            },
            updateCatalogList(){
                console.log('cataList',this.cataList)
                this.$forceUpdate()
            },
            createAnimation(){
                var form = document.querySelector("#animationForm");
                let fromData = new FormData(form);
                 this.$http.post(this.INTERFACE.createAnimation,fromData).then(res=>{
                    if(res.data.code==200){
                        console.log(res)
                    }
                })
            },
            handleSelectSub(ev){
                let id = this.subjects.findIndex((el=>{
                    return el.name === ev.target.value
                }))
                this.form.subject['id']= id+1
            },
            handleSelectcatalogue(ev){
                let obj = this.cacheCataList.find((el=>{
                    return el.name === ev.target.value
                }))
                this.form.catalogueId = obj.id
            },
            createFile(){
                this.isCreated = true
                this.isNextStep = true
            },
            handleAddSubject(){
                this.$http.post(this.INTERFACE.addSubject,{name:this.subjectValue}).then(res=>{
                    if(res.data.code==200){
                        this.getSubjects()
                    }
                })
            },
            handleDeleteSubject(){
                 this.$http.post(this.INTERFACE.deleteSubject,{id:this.form.subject['id']}).then(res=>{
                    if(res.data.code==200){
                        this.getSubjects()
                    }
                })
            },
            getSubjects(){
                this.$http.get(this.INTERFACE.getSubject).then(res=>{
                    if(res.data.code==200){
                        this.subjects = res.data.data
                        this.form.subject = this.subjects[0]
                        this.$forceUpdate()
                    }
                })
            },
            handleEdit(item){
                this.form = item
                this.isCreated= true
            },
            handleUpdateFile(item){
                let params = {
                    id:item.id,
                    status:item.status
                }
                this.$http.post(this.INTERFACE.updateFile,params).then(res => {
                    console.log(res)
                    this.isCreated = false
                })
            }, 
            handleDeleteFile(item){
                this.$http.post(this.INTERFACE.deleteFile,{'id':item.id}).then(res => {
                    if(res.data.code==200){
                        this.getFiles()
                    }
                })
            },
            getFiles(){
                this.$http.get(this.INTERFACE.getFiles).then(res => {
                    this.files = res.data.data
                })
            },
            handleNext(){
                this.isNextStep = !this.isNextStep 
            },
            handleAddImg(pos, $file){
                this.img_file[pos] = $file
            },
            addImage(type){
                var md = this.$refs.md
                var formdata = new FormData();
                for(var _img in this.img_file){
                    formdata.append(_img, this.img_file[_img]);
                }
                this.$http.post(this.INTERFACE.uploadImg, formdata).then(res => {
                    if(res.data.code==200){
                        for (var img of res.data.data) {
                        // $vm.$img2Url 详情见本页末尾
                            md.$img2Url((parseInt(img[0])), img[1]);
                        }
                        let form = document.querySelector("#fileForm");
                        let render = this.$refs.md.d_render
                        let fromData = new FormData(form);
                        fromData.set('subject',this.form.subject.id)
                        fromData.set('catalogueId',this.form.catalogueId)
                        fromData.set('content',this.form.content)
                        fromData.set('render',render)
                        fromData.set('status',type? '1':'0')
                            this.$http.post(this.INTERFACE.uploadFile, fromData).then(res => {
                            if(res.data.code==200){
                                this.addImage()
                                this.isCreated=false
                                this.getFiles()
                            }
                        })
                    }
                })
            },
            handleSaveFile(type){
                this.addImage(type)
                // let form = document.querySelector("#fileForm");
                // let render = this.$refs.md.d_render
                // let fromData = new FormData(form);
                // fromData.set('subject',this.form.subject.id)
                // fromData.set('content',this.form.content)
                // fromData.set('render',render)
                // fromData.set('status',type? '1':'0')
                // this.$http.post(this.INTERFACE.uploadFile, fromData).then(res => {
                //     if(res.data.code==200){
                //         this.addImage()
                //         this.isCreated=false
                //         this.getFiles()
                //     }
                // })
           }
            // handleUploadXls(){
            //     var form = document.querySelector("#fileForm");
            //     let fromData = new FormData(form);
            //     this.$http.post('http://localhost:3000/file/addXlsx', fromData).then(res => {
            //         console.log('--------', res)
            //     })
            // },
            // handleOpenTemplate(){
            //     let url = "http://localhost:3000/file/public/upload/模版.xlsx"
            //     window.open(url)
            // }
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
.nav-manage{
    li{
        cursor: pointer;
        &:hover{
            color:goldenrod;
        }
    }
}
.nav{
    background-color: #eee;
    padding:10px 0;
    margin-right: 20px;
    position: fixed;
    top:3.5rem;
    bottom:0;
    width:15rem;
    box-sizing: border-box;
}
.main{
    padding:1.5rem 0 6rem 15rem;
}
.fileInput{
    opacity: 1;
    position: absolute;
    bottom:0;
    left:0;
    width: 200px;
}
.mavon-editor{
    height:500px;
}
.node-arrow{
    margin-right:5px;
    cursor: pointer;
    &::before{
        width: 1.25em;
        line-height: 0;
        content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
        transition: transform 0.35s ease;
        transform-origin: .5em 50%;
    }
    &.show{
        transform: rotate(90deg);
    } 
}


</style>
