<template>
    <div class="knowled-contanier">
        <div class="breadcrumb">
            <ol>
                <li>所在位置：</li>
                <li class="location" @click="backToSubject"><a href="javascript:void()">资料</a>></li>
                <li>{{file.name}}</li>
            </ol>
        </div>
        <div class="content-warpper">
            <div class="render" v-html="file.render"></div>
            <div class="aside-right">
                <h3>下载</h3>
                <ul class="material-list">
                    <template v-for="material,index in materials">
                        <li :key="index" @click="handleDownLoad(material.url)">
                            <span><a href="javascript:void()">{{material.name}}</a></span>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeIndex: 0,
                file:{},
                materials:[]
            }
        },
        created() {
        },
        mounted(){
            this.$nextTick(()=>{
                let id = this.$route.query.id
                this.getMaterial(id)
                this.getFiles(id)
            })
        },
        methods: {
            backToSubject(){
                this.$router.push({name:'subject'})
            },
            handleDownLoad(url){
                window.open(url)
            },
            getFiles(id) {
                let _this = this;
                _this.$http.get(_this.INTERFACE.getFile+ '?id='+ id).then((res) => {
                    if(res.data.code ==200){
                        _this.file = res.data.data[0];
                    }
                });
            },
            getMaterial(id){
                this.$http.get(this.INTERFACE.getMaterial + '?id='+ id).then(res => {
                    this.materials = res.data.data
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
@media (max-width:700px) {
    .breadcrumb{
        display:none
    }
    .knowled-contanier{
        padding:2rem 0rem !important;
    }
    .content-warpper{
        display:flex;
        flex-direction: column-reverse;
    }
    .render{
        width:100% !important;
        margin-right:0px;
        margin-top:20px;
        overflow-x: hidden;
        p{
            word-wrap:break-word
        }
    }
}
@function remTpx($rem,$px) { 
  @return ($rem*16 + $px)+px
}
a{
    color:#666;
    &:hover{
        color: #2878FF;
        text-decoration: underline !important;
    }
}

.knowled-contanier{
    background-color: #F2F5F9;
    padding:2rem 6rem;
    overflow-y: auto;
    position:absolute;
    bottom:0;
    top: remTpx(1.4,40);
    width:100%;
    .breadcrumb  {
        margin-bottom:0;
        li{
            float:left;
            list-style: none;
        }
        .location{
            margin-right:4px;
        }
    }
    .content-warpper{
        display: flex;
        justify-content: flex-start;
        margin-right: 1rem;
        margin-left: 1rem;
        .render{
            background-color: #fff;
            width:80%;
            min-height: 30rem;
            padding:2rem 3rem;
            margin-right: 1rem;
            p {
                word-break: break-all;
            }
        }
    }
    .aside-right{
        float:right;
        background-color: #fff;
        padding:10px 20px;
        height:5rem;
        li{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        h3{ 
            padding-left: 1rem;
            font-size: 16px;
            border-left: 4px solid #458DEC;
            font-weight: 600;
            color: #000;
        }
    }
    .material-list{
        padding:0;
        margin:0;
        li{
            list-style: none;
            margin-bottom:5px;
        }
    }
}
    
</style>