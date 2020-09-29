import axios from 'axios'
import { BASE_URL } from '../contants';


const state = {
    procedures : [],
    new_procedure : null,
    updated_procedure : null
};


const getters = {
    allProcedures: (state) => state.procedures,
    newProcedures: (state) => state.new_procedure,
    updatedProcedures: (state) => state.updated_procedure
};

const actions = {
    async fetchProcedures ({ commit }){
        await axios.get(`${BASE_URL}/procedure/?limit=1000`)
        .then(response =>{
            console.log(response.data)
            commit('setAllProcedures',{ procedures: response.data.results });
        })
        .catch(error => {
            console.log(error)
        })
    },

    async addProcedure({ commit }, payload){
        await axios.post(`${BASE_URL}/procedure/` , payload.data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${payload.token}`
                }
            }
        ).then(response =>{
            commit('newProcedure', { procedure:response.data })
        })
        .catch(error => {
            console.log(error.response.data)
        })
    },

    async updateProcedure({ commit }, payload){
        console.log(payload)
        await axios.patch(`${BASE_URL}/procedure/${payload.data.id}/`, payload.data, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${payload.token}`
                }
            }
        ).then(response => {
            commit('updatedProcedureData', { procedure:response.data })
        }).catch(error =>{
            console.log(error)
        })
    }
};

const mutations = {
    setAllProcedures (state, { procedures }){
        state.procedures = procedures
    },
    newProcedure (state, { procedure }){
        state.new_procedure = procedure
    },
    updatedProcedureData (state, { procedure}){
        state.updated_procedure = procedure
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}