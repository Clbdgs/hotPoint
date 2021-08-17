<template>
    <div class="terminology-wrappwer">
            <span class="zm">AOA=Activity-On-Arrow</span>
            <span class="zm">ACWP=Actual Cost of Work Performed</span>
            <span class="zm">AS=Actual Start Date</span>
            <span class="zm">A0N=Activity-On-node</span>
            <span class="zm">ACWP=Actual Cost of Work Performed</span>
            <span class="zm">AS=Actual Start Date</span>
            <span class="zm">A0N=Activity-On-node</span>
            <span class="zm">ACWP=Actual Cost of Work Performed</span>
            <span class="zm">AS=Actual Start Date</span>
            
        <button class="btn-Lay" @click="layOut">排列</button>
        <button class="btn-float" @click="initFloat">浮动</button>
    </div>  
</template>
<script>
export default {
    created(){
    },
    mounted(){
        this.initFloat()
    },
    methods:{
        initFloat(){
            let words = document.querySelectorAll('.zm')
            words.forEach((el)=>{
                let top =  Math.random()*1000
                let left = Math.random()*1000
                if(top>window.innerHeight){
                    top =  Math.random()*1000
                }
                el.style.top = top + 'px'
                el.style.left = left + 'px'
            })
        },
        layOut(){
            let words = document.querySelectorAll('.zm')
            let preEl = null
           words.forEach((el,ind)=>{    
               let caTop = el.style.top
               let caLeft = el.style.left
               let mymove ='span-'+ind
                el.style.left =0
               if(ind==0){
                el.style.left = 0
                el.style.top = 0
                this.addCSSRule(document.styleSheets[0], `@keyframes ${mymove}`, `0% {top:${caTop};left:${caLeft}}100% {top:0px;left:0px}`)
                el.style.animationName = mymove
               }else{
                   let top = preEl.offsetHeight + preEl.offsetTop
                   el.style.top = top + 'px'
                    this.addCSSRule(document.styleSheets[0], `@keyframes ${mymove}`, `0% {top:${caTop};left:${caLeft}}100% {top:${top}px;left:${el.style.left}}`)
                    el.style.animationName = mymove
                    
               }
                console.log('0%:,',caTop,caLeft,'100%:',el.style.top,el.style.left)
               preEl = el
           })

           console.log(words)
        },
        addCSSRule(sheet, selector, rules, index) {
            if("insertRule" in sheet) {
                sheet.insertRule(selector + "{" + rules + "}", index);
            }else if("addRule" in sheet) {
                sheet.addRule(selector, rules, index);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.terminology-wrappwer{
    position:relative;
    span{
        position:absolute;
        border:1px solid yellowgreen;
        animation-duration: 4s;
        // float:left;
    }
    .box{
        float:left
    }
    .btn-Lay{
        position:absolute;
        right:-10px;
    }
    .btn-float{
        position:absolute;
        right:-60px;
    }
}
</style>