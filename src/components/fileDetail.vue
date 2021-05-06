<template>
    <div class="">
        <div class="breadcrumb-section">
            <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link to="/subject">计算机</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page"><a href="">详情</a></li>
                </ol>
            </nav>
        </div>
        <div class="row banner-section bg">
            <div class="col-2"><img src="../assets/logo.png" alt=""></div>
            <div class="col-8 d-flex flex-column">
                <div class="p-2 bd-highlight">信息系统项目管理工程师</div>
                <div class="p-2"><span class="text-dark">10000</span>下载</div>
                <div class="p-2">
                    <span class="btn-success btn-cus" @click="handleOpenTemplate">下载</span>
                </div>
            </div>
        </div>
        <div class="content-section">
            <div class="focus">
                <template v-for="btn,index in Btns">
                    <button ref="btnRef" :key="btn.name" :class="{active:btn.id==activeIndex}"
                        @click="activeIndex=index"><span>{{btn.name}}</span></button>
                </template>
            </div>
            <div class="">
                <div class="row g-0">
                    <div class="col-7">
                        <div class="mt-4">
                            <h2>简介</h2>
                            <p class="mt-4">系统集成项目管理工程师是工信部和人社部举办的软考中新增开的一门考试。系统集成项目管理工程师主要在信息系统建设和集成工作中担任相关的项目管理工作</p>
                        </div>
                        <div class="mt-4">
                            <h2>包内容</h2>
                            <div class="">
                                <h5 class="mt-4">示例</h5>
                                <table class="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <!-- <th scope="col">#</th> -->
                                            <th scope="col" style="width:80px">名称</th>
                                            <th scope="col">描述</th>
                                            <th scope="col">用途</th>
                                            <th scope="col">范围</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="tb,index in tables" :key="index">
                                            <!-- <th scope="row">1</th> -->
                                            <td>{{tb['名称']}}</td>
                                            <td>{{tb['描述']}}</td>
                                            <td>{{tb['用途']}}</td>
                                            <td>{{tb['范围']}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="imgEg">
                                <div class="row mt-4">
                                    <div class="">
                                        <div id="carouselExampleControls" class="carousel carousel-dark slide"
                                            data-bs-ride="carousel" data-bs-interval="false">
                                            <div class="carousel-inner">
                                                <div class="carousel-item active">
                                                    <img src="../assets/schedule.jpeg" class="d-block w-100" alt="...">
                                                </div>
                                                <div class="carousel-item">
                                                    <img src="../assets/schedule.jpeg" class="d-block w-100" alt="...">
                                                </div>
                                                <div class="carousel-item">
                                                    <img src="../assets/schedule.jpeg" class="d-block w-100" alt="...">
                                                </div>
                                            </div>
                                            <button class="carousel-control-prev" type="button"
                                                data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            </button>
                                            <button class="carousel-control-next" type="button"
                                                data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                    {
                        name: "Q&A",
                        id: 1
                    },
                    {
                        name: "Review",
                        id: 2
                    }
                ],
                breadcrumbValue: '',
                tables:[]
            }
        },
        created() {
            this.breadcrumbValue = this.$route.params.name
            this.fileURL = this.$route.params.url
            this.getXlsx()
        },
        methods: {
            handleOpenTemplate() {
                window.open(this.fileURL)
            },
            getXlsx(){
                this.$http.get('http://localhost:4999/getXlsx').then(res => {
                    this.tables = res.data.data
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .section {
        padding: 35px 0;
    }

    .container {
        padding: 0 25px;
    }

    .btn-cus {
        padding: 10px 35px;
        font-size: 14px;
        font-weight: 600;
    }

    .breadcrumb-section {
        height: 45px;
        line-height: 45px;
        padding:0 120px;
        margin:0 -120px;
        background-color: #232323;
    }

    .banner-section {
        padding: 32px 120px;
        margin:0 -120px;
        &.bg {
            background-color: #eff1f3;
        }
    }

    .content-section {

        h2 {
            font-size: 18px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
        }

        h5 {
            font-size: 16px;
        }

        p {
            font-size: 14px;
        }

        .carousel-item img {
            width: 100%;
            height: 100%;
        }
    }

    .focus {
        border-bottom: 1px solid;
        border-bottom-color: rgba(200, 200, 200, 1);

        button {
            border: 0;
            background-color: transparent;
            margin-left:-8px;
            color: #333333;
            display: inline-block;
            line-height: 40px;
            padding: 0 8px;
            text-align: center;
            position: relative;
            margin-right: 10px;
            &.active:before {
                content: '';
                bottom: 0;
                height: 2px;
                left: 8px;
                position: absolute;
                right: 8px;
                border-bottom: 2px solid #0078d4;
            }
            span{
                font-size: 16px;
                font-weight: 400;
                color:#333;
            }
        }

    }
</style>