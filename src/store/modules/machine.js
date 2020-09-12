import axios from 'axios'


const state = {
    machines: []
};

const getters = {
    allMachines: (state) => state.machines
};

const actions = {
    async fetchMachines ({ commit }, token) {
        let headers = {
            Authorization: `Bearer ${token}`
        }
        await axios.get('http://128.199.137.150/api/v1/machine/', { headers: headers })
        .then(response => {
            commit('setMachines' , response.data)
        })
        .catch(error => {
            console.log(error)
        })

    }
};

const mutations = {
    setMachines: (state, machines) => (state.machines = machines)
};

export default {
    state,
    getters,
    actions,
    mutations
}


