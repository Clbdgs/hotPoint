import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home'
import subject from '../components/subject'
import manage from '../components/manage'
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
        path:'/manage',
        name: 'manage',
        component: manage
    }
]

const router = new VueRouter({
    routes
})

export default router
  