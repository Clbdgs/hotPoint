<template>
    <div>
        <input v-if="node" type="text" name="" id="" v-model="node.name">
        <span v-if="node.parentId ===0" class="input-add" @click="handleAddNode(node)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </span>
        <span v-if="node.children || node.parentId" class="input-delete" @click="handleDeleteNode(node)">        
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
            </svg>
        </span>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    props:{
        node:{}
    },
    methods:{
        handleAddNode(data){
            let sort = data.children.length+1
            let node = {
                id : new Date().getTime(),
                name:"",
                parentId:data.id,
                sort:sort
            }
            data.children.push(node)
            // this.$emit('updateCatalogList')
        },
        handleDeleteNode(node){
            if(node.parentId){
                let parentNode = this.$parent.cataList.find(el=>el.id===node.parentId)
                parentNode.children.splice(node.sort-1,1)
                this.$emit('updateCatalogue')
            }
            if(node.name){
                this.$http.post(this.INTERFACE.deleteCatalogue,{'id':node.id}).then(res=>{
                    if(res.data.code==200){
                        this.$parent.getCatalogueList()
                    }
                })
            }
        }
        // updateCatalogList(node){
        //     this.$parent.catalogueList.find(el=>el.id === node.id)
        // }
    }
}
</script>
<style lang="scss" scoped>
.input-add{
    display: inline-block;
    cursor: pointer;
    margin-left:10px;
}
.input-delete{
    display: inline-block;
    cursor: pointer;
    margin-left:10px;
}
</style>