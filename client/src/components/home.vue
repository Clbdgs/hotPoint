<template>
    <div class="home-page">
        <div class="">
            <div class="markdown-body content-wrapper  mt-4 ">
                <div v-html="content"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { toggleSideOpen } from "@/store/types"; 
import { mapState } from 'vuex'
export default {
    data(){
        return{
            files:[],
            isSideOpen:false,
            fistContent:'',
            hasImage:false,
        }
    },
    created(){
        let that = this
        that.getFiles()
        if(that.isPc()){
            that.$store.commit(toggleSideOpen, true)
        }
    },
    computed:{
        content(){
            let sub = this.subIndex
            if(this.fistContent){
                let cache = this.fistContent
                this.fistContent = null 
                return cache
            }
            let obj = this.files.find(el=>el.catalogueId === sub)
            if(obj) return obj.render
        },
        ...mapState({
            subIndex: (state) => state.subIndex
        })
    },
    methods:{
        isPc(){
            let userAgentInfo = navigator.userAgent
            let agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod');
                        
            for (var v = 0; v < agents.length; v++) {
                if (userAgentInfo.indexOf(agents[v]) > 0) { 
                    return false
                }
            }

            return true
        },
        getFiles(){
            this.$http.post(this.INTERFACE.getFiles,{type:0}).then(res => {
                if(res.data.code==200){
                    this.subActive = res.data.data[0].catalogueId
                    this.files = res.data.data
                    this.fistContent = res.data.data[0].render
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>

@function remTpx($rem,$px) { 
  @return ($rem*16 + $px)+px
}
@media (max-width:700px) {
    .home-page .content-wrapper{
        left:0;
    }
    .content-wrapper{
        width:100%
    }
}
.content-wrapper{ 
    padding-right:3rem;
    padding-left:2rem;
    left:14rem;
    position: absolute;
    top:remTpx(1.4,40);
    bottom: 0px;
    overflow-y: auto;
    p{
        word-wrap:break-word
    }
}
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
}

    
</style>