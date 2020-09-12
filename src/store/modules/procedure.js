import axios from 'axios'


const state = {
    procedures: []
};

const getters = {
    allProcedures: (state) => state.procedures
};

const actions = {
    async fetchProcedures ({ commit }, token) {
        let headers = {
            Authorization: `Bearer ${token}`
        }
        await axios.get('http://128.199.137.150/api/v1/procedure/', { headers: headers })
        .then(response => {
            commit('setProcedures' , response.data)
        })
        .catch(error => {
            console.log(error)
        })

    }
};

const mutations = {
    setProcedures: (state, procedures) => (state.procedures = procedures)
};

export default {
    state,
    getters,
    actions,
    mutations
}


