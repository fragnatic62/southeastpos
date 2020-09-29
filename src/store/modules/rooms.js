import axios from 'axios'
import { BASE_URL } from '../contants';


const state = {
    rooms : [],
    updated_room : null,
    new_room : null,
    room: null,
    occupied_rooms: [],
};


const getters = {
    allRooms: (state) => state.rooms,
    updatedRoom: (state) => state.updated_room,
    newRoom: (state) => state.new_room,
    getUsedRoom: (state) => state.room,
    getOccupiedRooms: (state) => state.occupied_rooms
};


const actions = {
    async fetchRooms({ commit }){
        await axios.get(`${BASE_URL}/room/?limit=1000`)
        .then(response =>{
            commit('setAllRooms',{ rooms: response.data.results });
        })
        .catch(error => {
            console.log(error)
        })
    },

    async getRoom({ commit }, payload){
        await axios.get(`${BASE_URL}/room/${payload.id}/`, {}, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${payload.token}`
                }
            }
        ).then(response => {
            commit('setRoom', { room :response.data })
        }).catch(error =>{
            console.log(error)
        })
    },

    async addRoom({ commit }, payload){
        await axios.post(`${BASE_URL}/room/` , payload.data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${payload.token}`
                }
            }
        ).then(response =>{
            commit('newRoom', { room:response.data })
        })
        .catch(error => {
            console.log(error.response.data)
        })
    },

    async updateRoom({ commit }, payload){
        console.log(payload)
        await axios.patch(`${BASE_URL}/room/${payload.data.id}/`, payload.data, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${payload.token}`
                }
            }
        ).then(response => {
            commit('updateRoom', { room :response.data })
        }).catch(error =>{
            console.log(error)
        })
    },
    async fetchOccupiedRooms({ commit }, payload) {
        await axios.get(`${BASE_URL}/session/session_appointment/${payload.data.id}/room_occupied_list/`,{},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${payload.token}`
                }
            }).then(response => {
                commit('setOccupiedRooms',{ room :response.data})
            }).catch(error => {
                console.log(error)
            })
    }

};

const mutations = {
    setAllRooms (state, { rooms }){
        state.rooms = rooms
    },
    newRoom (state, { room }){
        state.new_room = room
    },
    updateRoom (state, { room }){
        state.updated_room = room
    },
    setRoom (state, { room }){
        state.room = room
    },
    setOccupiedRooms(state, { room }){
        
        state.occupied_rooms = room
    }

};

export default {
    state,
    getters,
    actions,
    mutations
}



