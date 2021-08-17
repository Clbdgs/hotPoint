<template>
  <div class="dialog-wrapper">
    <form id="loginForm">
      <span class="delete-btn">
        <router-link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </router-link>
      </span>
      <span class="back-btn" v-if="isRegister" @click="isRegister = false"
        >返回</span
      >
      <div class="d-flex justify-content-center mb-2" style="color: #fff">
        {{ isRegister ? "注册账号" : "密码登录" }}
      </div>
      <div class="item">
        <input
          v-if="!isRegister"
          type="email"
          name="email"
          maxlength="40"
          placeholder="请输入账号/邮箱"
        />
        <input
          v-else
          type="email"
          maxlength="40"
          v-model="emailValue"
          autocomplete="on"
          placeholder="请输入邮箱"
        />
      </div>
      <!-- <div class="item"> 
        <input type="password" placeholder="请输入验证码">
        <button class="" style="display: inline-block;position: absolute;right: 20px;" @click="getVertifyCode">验证码</button>
        </div> -->
      <div class="item">
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="请输入密码"
        />
      </div>
      <!-- <div v-if="!isRegister" class="register mt-2" @click="handlRegister">
        <span>注册账号</span>
      </div> -->
      <div class="d-grid gap-2 mt-3">
        <button class="btn btn-secondary" type="button" @click="handleLogin">
          登陆
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { logIn } from "@/store/types";
export default {
  data() {
    return {
      isRegister: false,
      emailValue: "",
      password: "",
    };
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.auth.isLogin,
    }),
  },
  methods: {
    handlRegister() {
      this.isRegister = true;
    },
    handleLogin() {
      let form = document.querySelector("#loginForm");
      let fromData = new FormData(form);
      this.logIn(fromData);
    },
    ...mapActions([logIn]),
  },
  watch: {
    isLogin: function (val) {
      if (val) {
        this.$router.push({ name: "manage" });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-wrapper {
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  z-index: 99999999;
  height: 300px;
  width: 300px;
  padding: 50px 50px;
  border-radius: 4px;
  border: 1px solid #333;
  .back-btn {
    position: absolute;
    top: 49px;
    left: 20px;
    color: #fff;
    cursor: pointer;
    &:hover {
      color: #00cc4c;
    }
  }
  .delete-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }
  .item {
    border-bottom: 1px solid #d8d8d8;
  }
  .register {
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      color: #00cc4c;
    }
  }
  input {
    width: 100%;
    border: none;
    outline: none;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #000;
    background: transparent;
  }
  input {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }
  input:focus-visible {
    border: none;
  }
}
</style>
