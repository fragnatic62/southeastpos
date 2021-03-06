import axios from 'axios'
import { BASE_URL } from '../contants';


const state = {
    patients: [],
    new_patient: null,
    updated_patient: null

};


const getters = {
    allPatients: (state) => state.patients,
    newPatient: (state) => state.new_patient,
    updatedPatient: (state) => state.updated_patient
};

const actions = {
    async fetchPatients({ commit }){
        await axios.get(`${BASE_URL}/patient/?limit=1000`)
        .then(response =>{
            commit('setAllPatients',{ patients: response.data.results });
        })
        .catch(error => {
            console.log(error)
        })
    },

    async addPatient({ commit }, payload){
        await axios.post(`${BASE_URL}/patient/` , payload.data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${payload.token}`
                }
            }
        ).then(response =>{
            commit('newPatients', { patient:response.data })
        })
        .catch(error => {
            console.log(error.response.data)
        })
    },

    async updatePatient({ commit }, payload){
        await axios.patch(`${BASE_URL}/patient/${payload.data.id}/`, payload.data, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${payload.token}`
                }
            }
        ).then(response => {
            commit('updatedPatients', { patient:response.data })
        }).catch(error =>{
            console.log(error)
        })
    }
};

const mutations = {
    setAllPatients (state, { patients }) {
        state.patients = patients
    },
    newPatients (state, { patient }) {
        state.new_patient = patient
    },
    updatedPatients (state, { patient}) {
        state.updated_patient = patient
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}