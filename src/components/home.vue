<template>
    <div class="home-page">
        <div class="aside border-end">            
            <ul>
                <template v-for="catalogue in catalogueList">
                    <li :key=catalogue.id class="mb-1">
                        <div class="d-inline-flex align-items-center" @click="handleCollapse(catalogue)">
                            <i class="title" :class="{'show':catalogue.isHidden}"></i><span>{{catalogue.name}}</span>
                        </div>
                        <ul v-if="catalogue.isHidden">
                                <template v-for="sub in catalogue.children">
                                <li :key=sub.id>
                                    <span class="sub-title d-inline-flex" :class="{'active':sub.id==subActive}" @click="handleActive(sub)">  
                                        {{sub.name}}
                                    </span>
                                </li>
                            </template>
                        </ul>
                    </li>
                </template>
            </ul>
        </div>
        <div class="markdown-body content-wrapper">
            <div v-html="content"></div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            active:1,
            subActive:0,
            catalogueList:[],
            leftMenu:[
                {   
                    id:1,
                    title:"浏览器相关原理",
                    isHidden:true,
                    subContent:[
                        { id:1.1,name:"渲染原理" },
                        { id:1.2,name:"渲染原理" },
                        { id:1.3,name:"渲染原理" },
                        { id:1.4,name:"渲染原理" }
                    ]
                },
                {   
                    id:2,
                    title:"前端三板斧HCJ",
                    isHidden:false,
                    subContent:[
                        { id:2.1,name:"HTML常用布局"}
                    ]
                },
                {   
                    id:3,
                    title:"js模块化发展历史",
                    isHidden:false,
                    subContent:[
                        { id:3.1,name:"commonjs"}
                    ]
                },
                {   
                    id:4,
                    title:"前端框架",
                    isHidden:false,
                    subContent:[
                        { id:4.1,name:"vue"}
                    ]
                },
                {   
                    id:5,
                    title:"前端工具",
                    isHidden:false,
                    subContent:[
                        { id:5.1,name:"webpack" },
                        { id:5.2,name:"webpack-chain"}
                    ]
                }
            ],
            files:[],
            content:''
        }
    },
    created(){
        this.getFiles()
        this.getCatalogueList()
    },
    mounted(){
    },
    methods:{
         getFiles(){
            this.$http.get(this.INTERFACE.getFiles).then(res => {
                if(res.data.code==200){
                    this.subActive = res.data.data[0].catalogueId
                    this.files = res.data.data
                    this.content = res.data.data[0].render
                }
            })
        },
        getCatalogueList(){
            this.$http.get(this.INTERFACE.getCatalogueList).then(res=>{
                if(res.data.code==200){
                    if(res.data.data){ 
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
                        this.catalogueList = catalogueList
                    }
                }
            })
        },
        handleCollapse(menu){
            menu.isHidden = ! menu.isHidden
        },
        handleActive(sub){
            let obj = this.files.find(el=>el.catalogueId ===sub.id)
            this.content = obj.render
            this.subActive = sub.catalogueId
        }, 
        handleSelectTopic(name){
            this.topicActive = name
        }
    }
}
</script>
<style lang="scss" scoped>
.home-page{
    a{
        text-decoration: none;
    }
    ul li {
        list-style: none;
        margin-bottom: 5px;
        cursor: pointer;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }   
    .aside{
        position:fixed;
        width:15rem;
        top: 3.6rem;
        left: 0;
        bottom: 0;
        padding:1.5rem 0;
        box-sizing: border-box;
        overflow-y: auto;
    }
    span.active{
        font-weight: 600;
        color: rgba(0,0,0,0.85);
    }
    .title{
        padding:0.25rem 0.5rem;
        font-weight: 700;
        color: rgba(0,0,0,0.65);
        &::before{
            width: 1.25em;
            line-height: 0;
            content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
            transition: transform 0.35s ease;
            transform-origin: .5em 50%;
        }
        &:hover{
            border-radius: 4px;
            color: rgba(0,0,0,0.85);
            background-color: rgba(121,82,179,0.1);
        }
        &.show{
            transform: rotate(90deg);
        } 
    }  
    .sub-title{  
        font-size:14px;
        padding: .1875rem .5rem;
        margin-top: .125rem;    
        color: rgba(0,0,0,0.65);
        &:hover{
            color: rgba(0,0,0,0.85);
            background-color: rgba(121,82,179,0.1);
        }
    }
    .content-wrapper{
        padding:1.5rem 0 6rem 15rem;
        height: 100%;
        > div{   
            max-width: 740px;
            margin: 0 auto; 
        }
    }
}

    
</style>