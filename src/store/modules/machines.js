import axios from 'axios'
import { BASE_URL } from '../contants';


const state = {
    machines : [],
    updated_machine : null,
    new_machine : null,
    machine: null,
    occupied_machine: null
};


const getters = {
    allMachines: (state) => state.machines,
    updatedMachine: (state) => state.updated_machine,
    newMachine: (state) => state.new_machine,
    getUsedMachine: (state) => state.machine,
    getOccupiedMachine: (state) => state.occupied_machine
};

const actions = {
    async fetchMachines({ commit }){
        await axios.get(`${BASE_URL}/machine/?limit=1000`)
        .then(response =>{
            console.log(response.data)
            commit('setAllMachines',{ machines: response.data.results });
        })
        .catch(error => {
            console.log(error)
        })
    },

    async getMachine({ commit }, payload){
        await axios.patch(`${BASE_URL}/machine/${payload.id}/`, {}, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${payload.token}`
                }
            }
        ).then(response => {
            commit('setMachine', { machine:response.data })
        }).catch(error =>{
            console.log(error)
        })
    },

    async addMachine({ commit }, payload){
        await axios.post(`${BASE_URL}/machine/` , payload.data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${payload.token}`
                }
            }
        ).then(response =>{
            commit('newMachine', { machine:response.data })
        })
        .catch(error => {
            console.log(error.response.data)
        })
    },

    async updateMachine({ commit }, payload){
        await axios.patch(`${BASE_URL}/machine/${payload.data.id}/`, payload.data, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${payload.token}`
                }
            }
        ).then(response => {
            commit('updateMachineData', { machine:response.data })
        }).catch(error =>{
            console.log(error)
        })
    },
    async fetchOccupiedMachine({ commit }, payload){
        await axios.get(`${BASE_URL}/session/session_appointment/${payload.data.id}/machine_occcupied_list/`,{},
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${payload.token}`
            }
        }).then(response => {
            commit('setOccupiedMachine',{ machine:response.data})
        })
    }

};

const mutations = {
    setAllMachines (state, { machines }){
        state.machines = machines
    },
    newMachine (state, { machine }){
        state.new_machine = machine
    },
    updateMachineData (state, { machine}){
        state.updated_machine = machine
    },
    setMachine (state, { machine }) {
        state.machine = machine
    },
    setOccupiedMachine (state, { machine }){
        state.occupied_machine = machine
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}