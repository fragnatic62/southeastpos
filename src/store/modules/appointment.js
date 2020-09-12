import axios from 'axios'


const state = {
    appointments: []
};

const getters = {
    allAppointments: (state) => state.appointments
};

const actions = {
    async fetchAppointments ({ commit }, token) {
        let headers = {
            Authorization: `Bearer ${token}`
        }
        await axios.get('http://128.199.137.150/api/v1/appointment/', { headers: headers })
        .then(response => {
            commit('setAppointments' , response.data)
        })
        .catch(error => {
            console.log(error)
        })

    }
};

const mutations = {
    setAppointments: (state, appointments) => (state.appointments = appointments)
};

export default {
    state,
    getters,
    actions,
    mutations
}


