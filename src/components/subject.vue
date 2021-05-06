<template>
    <div class="subject-page">
        <!-- <div class="breadcrumbs mt-4 mb-4">
            <ul class="nav nav-pills flex-column flex-sm-row">
                <template v-for="subject in subjects">
                    <li class="nav-item" :key='subject.name' @click="handleSelectTopic(subject.name)">
                        <a class="nav-link" :class="{'active':subjectActive=== subject.name}"
                            href="#">{{subject.name}}</a>
                    </li>
                </template>
            </ul>
        </div> -->
        <div class="webSite mt-5">
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
                this.$http.get('http://localhost:4999/files').then(res => {
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

        .breadcrumbs {
            height: 50px;
        }

        .webSite {}
    }
</style>