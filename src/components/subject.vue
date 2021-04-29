<template>
    <div class="subject-page">
        <div class="breadcrumbs">
            <ul class="nav nav-pills flex-column flex-sm-row">    
                <template v-for="subject in subjects">
                    <li class="nav-item" :key='subject.name' @click="handleSelectTopic(subject.name)">
                       <a class="nav-link" :class="{'active':subjectActive=== subject.name}" href="#">{{subject.name}}</a>
                    </li> 
                </template>
            </ul>
        </div>
        <div class="webSite">
            <div class="row">
                <template v-for="file in files">
                    <div class="col" :key="file.name">
                        <div class="card text-start text-dark bg-light mb-10" style="max-width: 18rem;" >
                            <div class="card-body">
                                <h5 class="card-title">系统集成项目管理工程师资料包</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                </template>
             </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            subjectActive:"计算机",
            subjects:[
                { id:1,name:"计算机" },
                { id:2,name:"英语" }
            ],
            files:[]
        }
    },
    created(){
        this.getFiles()
    },
    methods:{
        handleSelectTopic(name){
            this.subjectActive = name
        },
        downLoad(file){
            window.open(file.URL)
        },
        getFiles(){
            this.$http.get('http://localhost:3000/files').then(res=>{
                this.files = res.data.files
                console.log('files',this.files)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.subject-page{
    .breadcrumbs{
        // height:50px;
        li{ 
        }
        .active-topic{
            color:blue
        }
    }
    .webSite{
        // ul li{
        //     display: flex;
        //     /* text-align: center; */
        //     flex-direction: column;
        //     justify-content: center;
        //     align-items: center;
        //     float:left;
        //     width:80px;
        //     margin-right:20px;
        //     border:1px solid #333;
        //     border-radius: 10px;
        //     padding:10px 10px;
        //     cursor: pointer;
        //     img{
        //         width:48px;
        //         height:48px;
        //     }
        // }
    }
}    
</style>