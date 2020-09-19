import axios from 'axios'


const state = {
    user: null,
    session: null,
    appointment_sessions: [],
    updated_session: null
};


const getters = {
    getUser: (state) => state.user,
    getSession: (state) => state.session,
    getAppointmentSessions: (state) => state.appointment_sessions,
    getUpdatedAppointmentSessions: (state) => state.updated_session
};

const actions = {
    async fetchUser({ commit }, payload) {
        await axios.get(`http://128.199.137.150/api/v1/patient/${payload.user_id}/`,{},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${payload.token}`
                }
            }
        ).then(response =>{
            commit('setUser', { user:response.data })
        }).catch(error =>{
            console.log(error)
        })
    },

    async createSession({ commit }, payload) {
        await axios.post('http://128.199.137.150/api/v1/session/session/', payload.data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${payload.token}`
                }
            }
        ).then(response =>{
            commit('setSession', { session:response.data })
            commit('setAppointmentSessions', { appointment_sessions:response.data.sessions })
        }).catch(error =>{
            console.log(error.response)
        })
    },

    async updateSession({ commit }, payload) {
        console.log(payload.data.room)
        await axios.patch(`http://128.199.137.150/api/v1/session/session_appointment/${payload.data.id}/`, payload.data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${payload.token}`
                }
            }
        ).then (response => {
            commit('setUpdatedAppointmentSessions', { updated_appointment_sessions: response.data })
        }).catch(error => {
            console.log(error.response)
        })
    },

    async deleteSession({ commit }, payload ) {
        await axios.delete(`http://128.199.137.150/api/v1/session/session_appointment/${payload.id}/`, {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${payload.token}`
                }
            }
        ).then(response =>{
            console.log(response.data)
        }).catch(error =>{
            console.log(error.response)
        })
    }
};

const mutations = {
    setUser (state, { user }) {
        state.user = user;
    },
    setSession (state, { session }) {
        state.session = session;
    },
    setAppointmentSessions (state, { appointment_sessions }) {
        state.appointment_sessions = appointment_sessions
    },
    setUpdatedAppointmentSessions (state, { updated_appointment_sessions }) {
        state.updated_session = updated_appointment_sessions
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}