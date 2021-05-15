<template>
    <div class="home-page mt-4">
        <div class="breadcrumbs">
            <ul class="nav nav-pills flex-column flex-sm-row">    
                <template v-for="topic in topics">
                    <li class="nav-item" :class="{'active':topicActive=== topic.name}" :key='topic.name' @click="handleSelectTopic(topic.name)">
                        <a class="nav-link" :class="{'active':topicActive=== topic.name}" href="#">{{topic.name}}</a>
                    </li>
                </template>
            </ul>
        </div>
        <div class="webSite clearfix d-flex justify-content-start">
            <ul>
                <template v-for="(menu,index) in menus">
                    <li :key="index">
                        <a target="_blank" :href="menu.address">
                            <img :src="menu.iconUrl" alt="">
                            <span>{{menu.name}}</span>
                        </a>
                    </li>
                </template>
             </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            topicActive:'热门',
            topics:[
                { id:1,name:"热门" },
                { id:2,name:"娱乐" },
                { id:3,name:"科技" },
                { id:4,name:"军事" },
                { id:5,name:"生物" },
                { id:6,name:"英语" }
            ],
            menus:[
                {
                    name:"Youtube",
                    iconUrl:require("../assets/youtube.png"),
                    address:'http://youtube.com'
                },
                {
                    name:"twitter",
                    iconUrl:require("../assets/twitter.png"),
                    address:'http://twitter.com'
                },
                {
                    name:"facebook",
                    iconUrl:require("../assets/facebook.png"),
                    address:'http://facebook.com'
                }
            ]
        }
    },
    created(){
    },
    methods:{
        handleSelectTopic(name){
            this.topicActive = name
        }
    }
}
</script>
<style lang="scss">
.home-page{
    .breadcrumbs{
        height:50px;
        // li{ 
        //     float:left;
        //     cursor: pointer;
        //     margin-right:10px;
        //     width:50px;
        //     height:20px;
        //     padding:5px 5px;
        //     border:1px solid #333;
        //     border-radius: 5px;
        // }
        // .active-topic{
        //     color:blue
        // }
    }
    .webSite{
        ul{
            padding:0px;
        }
        ul li{
            display: flex;
            /* text-align: center; */
            flex-direction: column;
            justify-content: center;
            align-items: center;
            float:left;
            width:120px;
            margin-right:20px;
            border:1px solid #333;
            border-radius: 10px;
            cursor: pointer;
            img{
                display: block;
                width:100%;
                height:100%;
            }
        }
    }
}
    
</style>