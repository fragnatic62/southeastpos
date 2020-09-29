import axios from 'axios'
import { BASE_URL } from '../contants';


const state = {
    access_token: localStorage.getItem('access_token') || null,
    refresh_token: localStorage.getItem('refresh_token') || null,
    auth: localStorage.getItem('is_authenticated') || false,
};

const getters = {
    getAccessToken: (state) => state.access_token,
    getRefreshToken: (state) => state.refresh_token,
    authorized: (state) => state.auth
};

const actions = {
    async authenticate ({ commit }, credentials) {
        await axios.post(
            `${BASE_URL}/auth/token/`,
            credentials
            )
            .then(response => {
                localStorage.setItem('access_token', response.data.access)
                localStorage.setItem('refresh_token',response.data.refresh)
                localStorage.setItem('is_authenticated',true)
                commit('setAuthorization', true)
                commit('updateStorage' , { access_token: response.data.access, refresh_token: response.data.refresh })
            })
        },
    logout ({ commit }) {
        if (getters.getAccessToken || getters.getRefreshToken){
            commit('destroyTokens')
        }
    }
};

const mutations = {
    updateStorage (state,{ access_token, refresh_token }) {
        state.access_token = access_token
        state.refresh_token = refresh_token
    },
    destroyTokens (state) {
        state.access_token = null
        state.refresh_token = null
        state.auth = false
        localStorage.setItem('access_token', null)
        localStorage.setItem('refresh_token',null)
        localStorage.setItem('is_authenticated',false)
    },
    setAuthorization(state, isAuthorized) {
        state.auth = isAuthorized
    }

};

export default {
    state,
    getters,
    actions,
    mutations
}

