<template>
  <div class="subject-contanier">
    <main>
      <div class="d-flex justify-content-center search mb-4">
        <div class="search-wrapper">
          <input
            class="ms-0"
            autocomplete="off"
            autofocus
            v-model="searchVaue"
            placeholder="Search"
          />
          <i class="icon-search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </i>
        </div>
        <!-- <button class="btn btn-outline-success" type="submit">Search</button>             -->
      </div>
      <div class="row">
        <div class="resource-nav col-sm-2">
          <ul>
            <template v-for="(sub, index) in subjects">
              <li
                :key="index"
                :class="{ active: sub.id == subjectIndex }"
                :title="sub.name"
                @click="handleSelectSubject(sub.id)"
              >
                {{ sub.name }}
              </li>
            </template>
          </ul>
        </div>
        <div class="material-contanier col-8 row" >
          <template v-for="(file, index) in filterFileData">
            <div
              v-if="file.status == '1'"
              class="mb-4 col-12 col-sm-12 col-md-6 col-lg-4"
              :key="file.index"
            >
              <div
                ref="cardRef"
                class="card text-start"
              >
                <div class="card-body">
                  <h5 class="card-title fw-bold">{{ file.name }}</h5>
                  <p class="card-text">{{ file.des }}</p>
                  <a
                    class="btn btn-primary btn-sm mt-2"
                    @click="handleToDetail(file)"
                    >详情</a
                  >
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import { toggleSideOpen } from "@/store/types";
export default {
  data() {
    return {
      subjectIndex: 0,
      files: [],
      subjects: [],
      searchVaue:'',
      searchBox:[]
    };
  },
  created() {
    this.getFiles();
    this.getSubjects();
    this.$store.commit(toggleSideOpen, false)
  },
  computed: {
    filterFileData() {
      return this.files.filter((item) => {
        if(this.searchVaue){
          return item.name.indexOf(this.searchVaue)!=-1 && item.subjectId == this.subjectIndex
        }
        return item.subjectId == this.subjectIndex;
      });
    },
    sideOpen(){
      return this.$store.state.isSideOpen
    }
  },
  methods: {
    handleSelectSubject(id) {
      this.subjectIndex = id;
    },
    getSubjects() {
      this.$http.get(this.INTERFACE.getSubject).then((res) => {
        if (res.data.code == 200) {
          this.subjects = res.data.data;
          this.subjectIndex = res.data.data[0].id;
          this.$forceUpdate();
        }
      });
    },
    getFiles() {
      this.$http.post(this.INTERFACE.getFiles, { type: 1 }).then((res) => {
        this.files = res.data.data;
      });
    },
    handleToDetail(file) {
      this.$router.push({
        name: "fileDetail",
        query: {
          id: file.id,
        },
      });
    },
    handleCardShadow(index, bool = true) {
      let cardEl = this.$refs.cardRef[index];
      if (bool) {
        cardEl.classList.add("shadow");
        return;
      }
      cardEl.classList.remove("shadow");
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width:700px) {
    .resource-nav ul li{
      float:left;
      margin-right:10px !important;
    }
    .resource-nav{
      margin-bottom:20px;
    }
}
* {
  margin: 0;
  padding: 0;
}
@media (max-width:768px) {
    .material-contanier{
      margin: 0 auto;
    }
}
@media (max-width:490px) {
    .search-wrapper input {
      width:200px !important;
    }
}

.search {
  background-color: #fff;
  height: 48px;
  font-size: 18px;
  margin: 9px;
  .search-wrapper {
    input {
      padding-left: 10px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      border: 1px solid #d4d4d5;
      width: 25rem;
      height: 42px;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
      outline: none;
    }
    .icon-search {
      color: #fff;
      display: inline-block;
      background-color: royalblue;
      width: 42px;
      line-height: 42px;
      text-align: center;
      cursor: pointer;
    }
  }
}
.subject-contanier {
  padding-top: 2rem;
  .nav-link {
    color: #333;
  }
  .resource-nav {
    padding-left: 4rem;
    border-left: 1px solid #eee;
    height: 100%;
    ul {
      li {
        margin-bottom: 4px;
        padding-left: 10px;
        cursor: pointer;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &:hover,
        &.active {
          margin-right:10px;  
          color: royalblue;
          margin-left: -2px;
          border-left: 2px solid blue;
        }
      }
    }
  }
  .breadcrumbs {
    height: 50px;
  }
  .card {
    width: 18rem;
    padding:1rem 1rem;
    margin-right: 20px;
  }
  .card-title {
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .card-body {
    font-size: 12px;
    p {
      height: 60px;
    }
    .btn{
      padding:.375rem .75rem ;
    }
  }
}
</style>