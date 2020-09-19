import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.js'
import rooms from './modules/rooms.js'
import machines from './modules/machines.js'
import procedures from './modules/procedures.js'
import patients from './modules/patients.js'
import bookings from './modules/bookings.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    rooms,
    machines,
    procedures,
    patients,
    bookings
  }
})
