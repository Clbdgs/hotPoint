<template>
    <div class="knowled-contanier">
        <div class="content-warpper">
            <div class="" v-html="file.render"></div>
        </div>
        <div class="aside-right">
            <ul class="material-list">
                <template v-for="material,index in materials">
                    <li :key="index" @click="handleDownLoad(material.url)">
                        <span><a href="javascript:void()">{{material.name}}</a></span>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeIndex: 0,
                Btns: [{
                        name: "Overview",
                        id: 0
                    },
                    // {
                    //     name: "Review",
                    //     id: 1
                    // }
                ],
                file:{},
                tables:[],
                materials:[]
            }
        },
        created() {
            // this.getXlsx()
        },
        mounted(){
            this.$nextTick(()=>{
                this.file = this.$route.params.file
                this.getMaterial(this.$route.params.file.id)
            })
        },
        methods: {
            handleDownLoad(url){
                window.open(url)
            },
            getMaterial(id){
                this.$http.get(this.INTERFACE.getMaterial + '?id='+ id).then(res => {
                    this.materials = res.data.data
                })
            },
            handleOpenTemplate() {
                window.open(this.file.url)
            },
            getXlsx(){
                this.$http.get('http://localhost:3000/file/getXlsx').then(res => {
                    this.tables = res.data.data
                })
            },
            handleSelectFocus(index){
                this.activeIndex = parseInt(index)
            }
        }
    }
</script>
<style lang="scss" scoped>
@function remTpx($rem,$px) { 
  @return ($rem*16 + $px)+px
}
.knowled-contanier{
    display: flex;
    justify-content: flex-start;
    padding-left:6rem;
    max-height: calc(100vh - 66px);
    padding-top:2rem;
    overflow-y: auto;
    .content-warpper{
        width:80%;
    }
    .aside-right{
        padding:10px 20px;
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