import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Browse Warehouses',
    component: Home
  },
  {
    path: '/warehouse-:id',
    name: 'Warehouse Details',
    component: () => import(/* webpackChunkName: "about" */ '../views/Warehouse.vue'),
    meta: { transitionName: 'slide' },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
