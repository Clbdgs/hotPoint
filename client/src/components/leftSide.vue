<template>
  <div class="aside border-end">
    <ul>
      <template v-for="catalogue in catalogueList">
        <li :key="catalogue.id" class="mb-1">
          <div
            class="d-inline-flex align-items-center"
            @click="handleCollapse(catalogue)"
          >
            <i
              class="title"
              :title="catalogue.name"
              :class="{ show: !catalogue.isHidden }"
            ></i
            ><span>{{ catalogue.name }}</span>
          </div>
          <ul v-if="!catalogue.isHidden">
            <template v-for="sub in catalogue.children">
              <li :key="sub.id">
                <span
                  class="sub-title"
                  :class="{ active: sub.id == subActive }"
                  :title="sub.name"
                  @click="handleActive(sub)"
                >
                  {{ sub.name }}
                </span>
              </li>
            </template>
          </ul>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
    name: "left-side",
    data(){
        return{
            active:1,
            subActive:0,
            catalogueList:[],
        }
    },
    created(){
        this.getCatalogueList()
    },
    methods:{  
        getCatalogueList(){
            this.$http.get(this.INTERFACE.getCatalogueList).then(res=>{
                if(res.data.code==200){
                    if(res.data.data){ 
                        let catalogueList = []
                        res.data.data.forEach(item=>{
                            if(!item.parentId){
                                item.children = []
                                catalogueList.push(item)
                            }else{
                                let obj = catalogueList.find(el=>el.id===item.parentId)
                                obj.children.push(item)
                            }
                        })
                        this.catalogueList = catalogueList
                    }
                }
            })
        },
        handleActive(sub){
            this.subActive = sub.catalogueId
            this.$emit('changeSubIndex',sub.id)
        }, 
        handleCollapse(menu){
            menu.isHidden = ! menu.isHidden
        },
    }
};
</script>
<style scoped lang="scss">
@function remTpx($rem,$px) { 
  @return ($rem*16 + $px)+px
}
@media (max-width:700px) {
    .aside {
        top: 3.6rem;
        transform: translateX(-100%);
        transition: transform .2s ease;
    }
    .home-page  .content-wrapper{
        left:0;
    }
}
.sidebar-open .aside{
    top: 3.6rem;
    transform: translateX(0);
}
.aside{
    position: fixed;
    top: remTpx(1.4,40);
    bottom: 0;
    width:14rem;
    padding:1.5rem 0;
    padding-left:2rem;
    box-sizing: border-box;
    background-color: #fff;
    z-index: 1;
    >ul{
        margin-left:-2rem;
    }
    a{
        text-decoration: none;
    }
    ul li {
        list-style: none;
        margin-bottom: 5px;
        cursor: pointer;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }   
    span.active{
        font-weight: 600;
        color: rgba(0,0,0,0.85);
    }
    .title{
        padding:0.25rem 0.5rem;
        font-weight: 700;
        color: rgba(0,0,0,0.65);
        &::before{
            width: 1.25em;
            line-height: 0;
            content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
            transition: transform 0.35s ease;
            transform-origin: .5em 50%;
        }
        &:hover{
            border-radius: 4px;
            color: rgba(0,0,0,0.85);
            background-color: rgba(121,82,179,0.1);
        }
        &.show{
            transform: rotate(90deg);
        } 
    }  
    .sub-title{  
        font-size:14px;
        padding: .1875rem .5rem;
        margin-top: .125rem;    
        color: rgba(0,0,0,0.65);
        &:hover{
            color: rgba(0,0,0,0.85);
            background-color: rgba(121,82,179,0.1);
        }
    }
}
</style>