<template>
  <div id="app">
    <header class="header-container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#" style="color:#fff"><router-link to="/"> BDGS</router-link></a>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <!-- <a class="nav-link" href="#" ><router-link to="/animation"> 动画</router-link></a> -->
              <a class="nav-link" href="#" ><router-link to="/subject"> 资料</router-link></a>
              <a class="nav-link" href="#" ><router-link to="/manage"> 管理</router-link></a>
            </div>
          </div>
          <!-- <button @click="isHiddenDialog=true">登录</button> -->
        </div>
      </nav>
    </header>
    <main class="contanier clearfix">
      <router-view></router-view>
    </main>
    <footer class="foot-container">
      <p>粤ICP备2021086872号</p>
    </footer>
  </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    created(){
    },
    computed:{
      getFooter(){
        return this.$store.state.footer
      }
    },
    methods:{
      getVertifyCode(){
        this.$http.post('http://localhost:3000/sendEmail').then(res=>{
          console.log(res)
        })
      }
    }
}
</script>
<style lang="scss">
ul li{
  list-style: none;
}
#app {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  a{
    text-decoration: none;
  }
}
.header-container{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
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
.contanier{
  margin-top: 3.5rem;
  min-height: 500px;
  ul li{
    list-style: none;
  }
}
.foot-container{
  position: fixed;
  width: 100%;
  bottom: 0;
  padding:1.5rem 3rem;
  background-color:#f8f9fa;
  line-height: 18px;
  font-size: 14px;
  color: #63707c;
}
</style>
