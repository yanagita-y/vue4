import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Vuex from 'vuex'
import store from '@/store/index';

Vue.use(Vuex)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    beforeEnter: (to, from, next) => {
      if(!store.getters.user){
        console.log(store.getters.user);
        next('/');
      }
      next();
    },
    component: () => import('../views/DashboardView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
