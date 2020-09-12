import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import Home from '../views/Home.vue'
import Logout from '../views/Logout.vue'
import Patients from '../views/Patients.vue'
import Machine from '../views/Machine.vue'
import Room from '../views/Room.vue'
import Procedure from '../views/Procedure.vue'
import Appointment from '../views/Appointment.vue'
import BookingCalendar from '../views/BookingCalendar.vue'
import Booking from '../views/Booking.vue'

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
    path: '/patients',
    name: 'Patients',
    component: Patients,
    meta : {
      requiresLogin: true
    }
  },
  {
    path: '/machine',
    name: 'Machine',
    component: Machine,
    meta : {
      requiresLogin: true
    }
  },
  {
    path: '/room',
    name: 'Room',
    component: Room,
    meta : {
      requiresLogin: true
    }
  },
  {
    path: '/procedure',
    name: 'Procedure',
    component: Procedure,
    meta : {
      requiresLogin: true
    }
  },
  {
    path: '/appointment',
    name: 'Appointement',
    component: Appointment,
    meta : {
      requiresLogin: true
    }
  },
  {
    path: '/bookingcalendar',
    name: 'BookingCalendar',
    component: BookingCalendar,
    meta : {
      requiresLogin: true
    }
  },
  {
    path: '/booking',
    name: 'Booking',
    component: Booking,
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
