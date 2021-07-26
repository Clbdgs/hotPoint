/* eslint-disable */
<template>
    <div id="animation-wrapper">
        <div class="animation-container" v-html="contentHtml">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            contentHtml:''
        }
    },
    created(){
    },
    mounted(){
        this.$nextTick(()=>{
         this.getAnimationCode()

        })  
    },
    methods:{
        substr(html,tag1,tag2){
            let str 
            str = html.split(tag1)[1]
            str = str.split(tag2)[0]
            return str
        },
        async getAnimationCode(){
            let id = this.$route.params.id
            let name = this.$route.params.name
            let code = ''
            await this.$http.get(`http://localhost:3000/animation/getAnimationCode/${id}/${name}`).then(res=>{
                if(res.status==200){
                    code = res.data
                    this.contentHtml = this.substr(code,"<body>","</body>")
                }
            })
            this.createScript(this.substr(code,'<script>','</scrip' + 't>'))
            this.createCSSStyle(this.substr(code,"<style>","</style")) 
        },
        createScript(scriptStr){
            let script = document.createElement('script')
            script.innerHTML = scriptStr
            script.type = 'text/javascript'
            document.getElementById('animation-wrapper').appendChild(script)
        },
        createCSSStyle(css){
            let style = document.createElement('style')
            style.innerHTML = css
            document.getElementById('animation-wrapper').appendChild(style)
        }
    },
    watch:{
        '$route':'fetchData'
    }
}
</script>