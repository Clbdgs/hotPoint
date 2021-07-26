import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home'
import subject from '../components/subject'
import manage from '../components/manage'
import login from '../components/login'
import fileDetail from '../components/fileDetail'
import effect from '../components/effect'
Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        name: 'Home',
        component: Home,
        children:[
            {
                path:'',
                name:"content",
                component:() => import(/* webpackChunkName*/'../components/content')
            }
        ]
    },
    {
        path:'/animation',
        name: 'animation',
        component: () => import(/* webpackChunkName*/'../components/animation'),
        children:[
            {
                path:':name',
                component:effect
                // component:() => import(/* webpackChunkName*/'../components/effect')
            }
        ]
    },
    {
        path:'/subject',
        name: 'subject',
        component: subject
    },
    {
        path:'/fileDetail',
        name:'fileDetail',
        component:fileDetail
    },
    {
        path:'/manage',
        name: 'manage',
        component: manage
    },
    {   
        path:'/login',
        name: 'login',
        component: login
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
  