<template>
    <div class="subject-page mt-4">
        <div class="d-flex justify-content-center search mb-4">
            <input class="me-2 " placeholder="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>            
        </div>
        <main class="row">
            <nav class="resource-nav col-sm-2">
                <ul>
                    <li>英语</li>
                    <li>
                        计算机科学
                    </li>
                    <li>设计</li>
                    <li>建筑</li>
                </ul>
            </nav>
            <div class="col-8 row">
                 <template v-for="file,index in files">
                    <div class="mb-4 col-sm-4" :key="file.name">
                        <div ref="cardRef" class="card text-start w-100 h-100"
                            @mouseenter="handleCardShadow(index)" @mouseleave="handleCardShadow(index,false)">
                            <div class="card-body">
                                <h5 class="card-title fw-bold">{{file.name}}</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the
                                    bulk of the card's content.</p>
                                <a class="btn btn-primary btn-sm mt-2" @click="handleToDetail(file)">详情</a>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
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
                        file: file
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
*{
  margin:0;
  padding:0;
}   
.subject-page {
    .nav-link {
        color: #333;
    }
    .search{
        background-color: #fff;
        height: 48px;
        font-size: 18px;
        margin: 9px;
        input{
            padding-left:10px;
            border-radius: 4px;
            border: 1px solid #d4d4d5;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
            &::focus-visible{
                border: none;
            }
        }
    }
    .resource-nav{
        border-left: 1px solid #eee;
        height:100%;
        ul {
            li{
                &:hover{
                    border-left: 2px solid blue;
                }
            }
        }
    }
    .breadcrumbs {
        height: 50px;
    }
    .card-title{
        font-size:16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .card-body{
        font-size:12px;
    }
}
</style>