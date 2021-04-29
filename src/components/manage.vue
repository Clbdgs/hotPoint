<template>
    <div class="">
        <form id='fileForm' enctype="application/x-www-form-urlencoded">
            <!-- application/x-zip-compressed -->
            <input type="file" id="file" ref="upload" name="file" multiple="multiple" value="" accept="application/x-zip-compressed" >
            <input type="button" value="提交" @click="handleUpload">
        </form>
        <ul>
            <template v-for="file in files" >
                <li :key="file.name">
                    <a @click="downLoad(file)">{{file.name}}</a>
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            files:[]
        }
    },
    created(){
        this.getFiles()
    },
    methods:{
        handleUpload(){
            var form=document.querySelector("#fileForm");
            // console.log('--------',new FormData(document.getElementById('fileForm')[0]))
            // this.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            let fromData = new FormData(form);
            this.$http.post('http://localhost:3000/upload',fromData).then(res=>{
                console.log('--------',res)
            })
        }
    }
}
</script>
