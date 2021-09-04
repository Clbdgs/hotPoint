<template>
  <div id="app">
    <header class="header-container d-inline-flex align-items-center clearfix">
      <a class="navbar-brand" href="javascript:void()">
        <router-link to="/"
          ><img class="kavada" src="http://clbdgs.xyz/static/image/tx.775217c9.jpg" alt=""
        /></router-link>
        <!-- <router-link to="/"><img src="../logo.jpg" alt=""></router-link> -->
      </a>
      <nav class="nav-list navbar-close">
        <div class="">
          <router-link to="/subject"> 资料</router-link>
        </div>
        <div class="">
          <router-link to="/manage"> 管理</router-link>
        </div>
      </nav>
      <button
        class="navbar-toggle navbar-toggle-open"
        @click="handleToggleMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          class="bi"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          ></path>
        </svg>
      </button>
    </header>
    <main class="container-custom">
      <router-view></router-view>
    </main>
    <dialog-modal :src="imgSrc" :isShow.sync="imgIshow"></dialog-modal>
    <left-side></left-side>
    <!-- <footer class="foot-container">
      <p>粤ICP备2021086872号</p>
    </footer> -->
  </div>
</template>
<script>
import { toggleSideOpen } from "@/store/types";
import leftSide from "./components/leftSide.vue";
import dialogModal from "./components/dialog.vue";
export default {
  data() {
    return {
      imgSrc: "",
      imgIshow: false,
    };
  },
  components: {
    [leftSide.name]: leftSide,
    [dialogModal.name]: dialogModal,
  },
  created() {
    let that = this;
    document.addEventListener("click", function (ev) {
      if (ev.target.localName == "img" && ev.target.className!=='kavada') {
        that.imgSrc = ev.target.currentSrc;
        that.imgIshow = true;
      }
    });
  },
  mounted() {},
  computed: {
    getFooter() {
      return this.$store.state.footer;
    },
  },
  methods: {
    handleToggleMenu() {
      let open = false;
      if (this.$store.state.isSideOpen) {
        open = false;
      } else {
        open = true;
      }
      this.$store.commit(toggleSideOpen, open);
    },
    getVertifyCode() {
      this.$http.post("http://localhost:3000/sendEmail").then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
<style lang="scss">
html {
  overflow-x: hidden;
  overflow-y: hidden;
}
@function remTpx($rem, $px) {
  @return ($rem * 16 + $px) + px;
}
@media (max-width: 700px) {
  .navbar-toggle-open {
    display: block !important;
  }
}
@media (max-width: 700px) {
  .navbar-close {
    display: none !important;
  }
}
img {
  max-width: 100%;
}
ul li {
  list-style: none;
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  a {
    text-decoration: none;
  }
}
.navbar-brand {
  img {
    width: 40px;
    height: 40px;
    border-radius: 15px;
  }
}
.navbar-toggle {
  display: none;
  padding: 0;
  border: 0;
  background-color: transparent;
  color: #fff;
}
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #2c2c32;
  z-index: 999;
  padding: 0.7rem 1.5rem;
  .nav-list {
    display: flex;
    flex-direction: row;
    a:first-child {
      margin-left: 20px;
    }
  }
  .input-group-text {
    position: absolute;
    right: 20px;
    top: 15px;
    border: 0;
    background-color: transparent;
  }
  a {
    color: #fff;
  }
}
.container-custom {
  margin-top: remTpx(1.4, 40);
}
.foot-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  line-height: 2rem;
  padding: 1.5rem 3rem 0 15rem;
  background-color: #f8f9fa;
  font-size: 14px;
  color: #63707c;
}
</style>
