import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home'
import subject from '../components/subject'
import manage from '../components/manage'
import fileDetail from '../components/fileDetail'
Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        name: 'Home',
        component: Home
    },
    {
        path:'/guide',
        name: 'guide',
        component: Home
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
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
  