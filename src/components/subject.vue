<template>
    <div class="subject-page">
        <nav class="resource-nav">
            <ul>
                <li>英语</li>
                <li>
                    计算机科学
                    <span>网络信息安全</span>
                    <span>信息系统集成项目管理工程师</span>
                </li>
                <li>设计</li>
                <li>建筑</li>
            </ul>
        </nav>
        <main class="main">
            <section>
                <ul class="nav nav-pills mt-4" id="myTab" role="tablist">
                    <!-- <li class="nav-item" role="presentation">
                      <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">卡片</button>
                    </li> -->
                    <li class="nav-item" role="presentation">
                      <button class="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">包</button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="mt-4" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div class="row row-cols-1 row-cols-md-4">
                            <template v-for="file,index in files">
                                <div class="col me-4 mb-4" :key="file.name">
                                    <div ref="cardRef" class="card text-start" style="max-width: 18rem;"
                                        @mouseenter="handleCardShadow(index)" @mouseleave="handleCardShadow(index,false)">
                                        <div class="card-body">
                                            <h5 class="card-title">{{file.name}}</h5>
                                            <p class="card-text">Some quick example text to build on the card title and make up the
                                                bulk of the card's content.</p>
                                            <a class="btn btn-primary" @click="handleToDetail(file)">详情</a>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                subjectActive: "计算机",
                subjects: [{
                        id: 1,
                        name: "计算机"
                    },
                    {
                        id: 2,
                        name: "英语"
                    }
                ],
                files: []
            }
        },
        created() {
            this.getFiles()
        },
        methods: {
            handleSelectTopic(name) {
                this.subjectActive = name
            },
            getFiles() {
                this.$http.get('http://localhost:3000/files').then(res => {
                    this.files = res.data.files
                })
            },
            handleToDetail(file) {
                this.$router.push({
                    name: 'fileDetail',
                    params: {
                        name: file.name,
                        url: file.URL
                    }
                })
            },
            handleCardShadow(index, bool = true) {
                let cardEl = this.$refs.cardRef[index]
                if (bool) {
                    cardEl.classList.add("shadow")
                    return
                }
                cardEl.classList.remove("shadow")
            }
        }
    }
</script>

<style lang="scss" scoped>
    .subject-page {
        .nav-link {
            color: #333;
        }
        .resource-nav{
            float: left;
            margin-left: -100px;
            margin-right: 30px;
            border-left: 2px solid blue;
            ul {
                padding:0 20px;
                li{
                    span{
                        margin-left: 20px;
                        display: block;
                    }
                }
            }
        }
        .breadcrumbs {
            height: 50px;
        }
    }
</style>