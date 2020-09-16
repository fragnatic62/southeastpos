import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import Home from '../views/Home.vue'
import Logout from '../views/Logout.vue'
import Appointment from '../views/Appointment.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta : {
      requiresLogin: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta : {
      requiresLogin: true
    }
  },
  {
    path: '/appointments',
    name: 'Appointment',
    component: Appointment,
    meta : {
      requiresLogin: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
