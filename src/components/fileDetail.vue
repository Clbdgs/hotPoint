<template>
    <div>
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href=""><router-link to="/subject">计算机</router-link></a></li>
                <li class="breadcrumb-item active" aria-current="page">详情</li>
            </ol>
        </nav>
        <div class="card">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="../assets/logo.png" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body text-start">
                    <h5 class="card-title">{{breadcrumbValue}}</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    <a class="btn btn-primary" @click="handleDownLoadFile">下载</a>
                </div>
                </div>
            </div>
            </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            breadcrumbValue:''
        }
    },
    created(){
        this.breadcrumbValue = this.$route.params.name 
    }
}
</script>
<style lang="sass" scoped>

</style>