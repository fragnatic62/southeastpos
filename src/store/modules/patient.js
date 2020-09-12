import axios from 'axios'


const state = {
    patients: {}
};

const getters = {
    allPatients: (state) => state.patients
};

const actions = {
    async fetchPatients ({ commit }, params) {
        let url = 'http://128.199.137.150/api/v1/patient/'
        if (params.nextpage !== null){
            url = params.nextpage
        }
        console.log(url)
        let headers = {
            Authorization: `Bearer ${params.token}`
        }
        await axios.get(url, { headers: headers })
        .then(response => {
            commit('setPatients' , response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }
};

const mutations = {
    setPatients: (state, patients) => (state.patients = patients)
};

export default {
    state,
    getters,
    actions,
    mutations
}


