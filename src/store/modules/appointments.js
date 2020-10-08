import axios from 'axios'
import { BASE_URL } from '../contants';

const state = {
    appointments:[],
    unassigned_appointments:[],
}

const getters = {
    allAppointments: (state) => state.appointments,
    allUnassignedAppointments: (state) => state.unassigned_appointments
}

const actions = {
    async fetchAppointments({ commit }, payload  ){
        await axios.get(`${BASE_URL}/session/session/?patient=${payload.patient_id}`)
        .then(response => {
            commit('setAllAppointments',{ appointments: response.data.results })
        })
        .catch(error => {
            console.log(error)
        })
    },
    async fetchUnassignedAppointments({ commit }) {
        await axios.get(`${BASE_URL}/session/session_appointment/unassigned_appointment/`)
        .then(response => {
            console.log(response.data)
            commit('setUnassignedAppointments', { appointments: response.data })
        })
        .catch(error => {
            console.log(error)
        })
    }
}

const mutations = {
    setAllAppointments(state, { appointments }) {
        state.appointments = appointments
    },
    setUnassignedAppointments(state, { appointments }){
        state.unassigned_appointments = appointments
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}