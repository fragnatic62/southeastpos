import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import Logout from '../views/Logout.vue'
import Appointment from '../views/Appointment.vue'
import Patient from '../views/Patients.vue'
import Rooms from '../views/Rooms.vue'
import Machines from '../views/Machines.vue'
import Procedures from '../views/Procedures.vue'
import NewAppointment from '../components/NewAppointment.vue'

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
    path: '/appointments',
    name: 'Appointment',
    component: Appointment,
    meta : {
      requiresLogin: true
    }
  },
  {
    path: '/patients',
    name: 'Patients',
    component: Patient,
    meta : {
      requiresLogin: true
    },
  },
  {
    path: '/room',
    name: 'Rooms',
    component: Rooms,
    meta : {
      requiresLogin: true
    }
  },
  {
    path: '/machine',
    name: 'Machines',
    component: Machines,
    meta : {
      requiresLogin: true
    }
  },
  {
    path: '/procedure',
    name: 'Procedures',
    component: Procedures,
    meta : {
      requiresLogin: true
    }
  },
  {
    path: '/newappointment/:id',
    name: 'NewAppointment',
    component: NewAppointment,
    props:true,
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
