<template>
    <div>
        <div class="row mt-4">
            <template v-for="animation,index in animationList" >
                <div class="col-sm-2" :key="index">
                    <div class="card" @click="displayAnimation(animation)">
                        <img :src="animation.imgUrl" class="card-img-top" alt="">
                        
                        <div class="card-body">
                            <p class="card-text text-truncate">{{animation.des}}</p>
                        </div>
                        <div class="animation-modal">
                            <a class="animation-name link-info">{{animation.name}}
                            </a>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return{
            animationList:[],
            codeValue:''
        }
    },
    created(){
        this.getAnimation()
    },
    methods:{
        displayAnimation(animation){
            this.$router.push({path:'animation/'+ animation.name})
        },
        getAnimation(){
                this.$http.get(this.INTERFACE.getAnimations).then(res=>{
                if(res.data.code==200){
                    this.animationList = res.data.data
                }
            })
        }
    },
    watch:{
    }
}
</script>
<style lang="scss" scoped>
.add-icon{
    width: 150px;
    height:150px;
    border:1px solid #333;
    border-radius: 10px;
    transform: scale(0.8);
}
.card{
    position: relative;
    cursor: pointer;
    .animation-modal{
        position: absolute;
        width:100%;
        height:100%;
        transition:background-color 2s;
        &:hover{
            display: block;
            opacity: 0.8;
            background-color:rgb(106, 194, 245);
            .animation-name{
                opacity:1;
            }
        }
    }
    .animation-name{
        position: absolute;
        font-size: 20px;
        left:50%;
        top:50%;
        opacity:0;
        transition:opacity 3s;
        transform: translate(-50%, -50%);
        z-index: 1;
        color:#fff;
    }
}
</style>