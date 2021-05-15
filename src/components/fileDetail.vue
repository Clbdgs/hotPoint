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
            <div class="col-8 d-flex flex-column ms-4">
                <div class="p-2 bd-highlight">{{file.name}}</div>
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
                        @click="handleSelectFocus(index)"><span>{{btn.name}}</span></button>
                </template>
            </div>
            <div class="">
                <div class="row g-0">
                    <div class="col-7">
                        <div class="mt-4">
                            <h2>简介</h2>
                            <p class="mt-4">{{file.des}}</p>
                        </div>
                        <div class="mt-4">
                            <h2>包内容</h2>
                            <div class="mt-4" v-html="file.CONTENT"></div>
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
                        name: "Review",
                        id: 1
                    }
                ],
                file:{},
                tables:[]
            }
        },
        created() {
            this.getXlsx()
        },
        mounted(){
            this.$nextTick(()=>{
                this.file = this.$route.params.file
            })
        },
        methods: {
            handleOpenTemplate() {
                window.open(this.file.URL)
            },
            getXlsx(){
                this.$http.get('http://localhost:4999/getXlsx').then(res => {
                    this.tables = res.data.data
                })
            },
            handleSelectFocus(index){
                this.activeIndex = parseInt(index)
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
        font-size: 14px;
        a{
            color:#fff;
            &:hover{
                text-decoration: underline !important;
            }
        }
    }

    .banner-section {
        padding: 10px 120px;
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
            padding: 0 16px;
            text-align: center;
            position: relative;
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
            }
        }

    }
</style>