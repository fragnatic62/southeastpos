import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import patient from './modules/patient'
import room from './modules/room'
import machine from './modules/machine'
import procedure from './modules/procedure'
import appointment from './modules/appointment'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    patient,
    room,
    machine,
    procedure,
    appointment

  }
})
