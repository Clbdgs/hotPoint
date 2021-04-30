<template>
  <div id="app" class="row container-fluid">
    <div class="col-2 left-side">
        <div v-for="(menu,index) in menus" :key="index">
            <ul>
                <li><router-link :to="menu.enName">{{menu.cnName}}</router-link></li>
            </ul>
        </div>
    </div>
    <div class="col-8 right-side ms-5">
      <router-view></router-view>
    </div>
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
            }]
        }
    },
    created(){
    }
}
</script>
<style lang="scss">
ul li{
  list-style: none;
}
a{
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .left-side{
    background-color:pink;
    li{
      margin-bottom: 20px;
    }
  }
  .right-side{
  }
}
</style>
