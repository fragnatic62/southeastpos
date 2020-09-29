import axios from 'axios'
import { BASE_URL } from '../contants';

const state = {
    appointments:[]
}

const getters = {
    allAppointments: (state) => state.appointments
}

const actions = {
    async fetchAppointments({ commit }, payload  ){
        await axios.get(`${BASE_URL}/session/session/?patient=${payload.patient_id}`)
        .then(response =>{
            commit('setAllAppointments',{ appointments: response.data.results });
        })
        .catch(error => {
            console.log(error)
        })
    },
}

const mutations = {
    setAllAppointments(state, { appointments }) {
        state.appointments = appointments
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}