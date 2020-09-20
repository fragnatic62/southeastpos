import axios from 'axios'

const state = {
    appointments:[]
}

const getters = {
    allAppointments: (state) => state.appointments
}

const actions = {
    async fetchAppointments({ commit }, payload  ){
        await axios.get(`http://128.199.137.150/api/v1/session/session/?patient=${payload.patient_id}`)
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