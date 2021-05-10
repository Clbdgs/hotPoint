<template>
  <div id="app">
    <header class="header-container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link" href="#" ><router-link to="/"> 首页</router-link></a>
              <a class="nav-link" href="#" ><router-link to="/subject"> 资料</router-link></a>
              <a class="nav-link" href="#" ><router-link to="/manage"> 管理</router-link></a>
            </div>
          </div>
          <button @click="isHiddenDialog=true">登录</button>
        </div>
        <div v-if="isHiddenDialog" class="dialog-wrapper">
          <span class="delete-btn" @click="isHiddenDialog=false">x</span>
          <span class="back-btn" v-if='isRegister' @click="isRegister=false">返回</span>
          <div class="d-flex justify-content-center mb-2" style="color: #fff;">{{isRegister? "注册账号" : "密码登录"}}</div>
          <div class="item">
            <input v-if="!isRegister" type="email" maxlength="40" placeholder="请输入账号/邮箱">
            <input v-else type="email" maxlength="40" placeholder="请输入邮箱">
          </div>
          <div class="item"> 
            <input type="password" placeholder="请输入密码">
          </div>
          <div v-if="!isRegister" class="register mt-2" @click="handlRegister">
            <span>注册账号</span>
          </div>
          <div class="d-grid gap-2 mt-3">
            <button class="dbtn btn-secondary" type="button" > 登陆</button>
          </div>
        </div>
        <!-- <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <span class="input-group-text" @click="handleSearch">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </span>
        </form> -->
      </nav>
    </header>
    <main class="main-contanier clearfix">
      <router-view></router-view>
    </main>
    <footer class="foot-container mt-5 pt-5 pb-5">
      <div class="row">
        <div class="col-2">
          <dl>
            <dt class="mb-3">关于我们</dt>
            <dd>关于网站</dd>
          </dl>
        </div>
        <div class="col-2">
          <dl>
            <dt class="mb-3">联系客服</dt>
            <dd>联系我们</dd>
            <dd>客服QQ: 506433977</dd>
          </dl>
        </div>
      </div>
      <p>© 2009-2021 Aliyun.com 版权所有 增值电信业务经营许可证： 浙B2-20080101</p>
    </footer>
  </div>
</template>
<script>
export default {
    data(){
        return{
            menus:[{
                cnName:"导航",
                enName:"/guide"
            },
            {
                cnName:"学科",
                enName:"/subject"
            },
          ],
          isRegister:false,
          isHiddenDialog:false
        }
    },
    created(){
    },
    methods:{
      handlRegister(){
        this.isRegister = true
      }
    }
}
</script>
<style lang="scss">
ul li{
  list-style: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  a{
    text-decoration: none;
  }
}
.header-container{
  background-color: #2C2C32;
  padding:0 120px;
  .input-group-text{
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
.dialog-wrapper{
  position: fixed;
  transform: translate(-50%,-50%);
  top: 50%;
  left:50%;
  z-index: 99999999;
  height: 300px;
  width: 300px;
  padding:50px 50px;
  background-color: #2A2A32!important;
  border-radius: 4px;
  .back-btn{
    position: absolute;
    top:49px;
    left:20px;
    color:#fff;
    cursor: pointer;
    &:hover{
      color:#00CC4C;
    }
  }
  .delete-btn{
    position: absolute;
    top:20px;
    right:20px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }
  .item{
    border-bottom: 1px solid #d8d8d8;
  }
  .register{
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    &:hover{
      color:#00CC4C;
    }
  }
  input {
    width: 100%;
    border:none;
    outline: none;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    background: transparent;

  }
  input:focus-visible
  { 
    border:none;
  }
}

.main-contanier{
  padding: 0 120px;
  min-height: 500px;
}
.foot-container{
  width: 100%;
  height:100%;
  /* position: absolute; */
  bottom: 0;
  padding:0 120px;
  background-color:#f8f9fa;
  line-height: 18px;
  font-size: 14px;
  color: #63707c;
}
</style>
