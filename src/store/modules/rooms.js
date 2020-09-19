import axios from 'axios'


const state = {
    rooms : [],
    updated_room : null,
    new_room : null,
    room: null
};


const getters = {
    allRooms: (state) => state.rooms,
    updatedRoom: (state) => state.updated_room,
    newRoom: (state) => state.new_room,
    getUsedRoom: (state) => state.room,
};


const actions = {
    async fetchRooms({ commit }){
        await axios.get('http://128.199.137.150/api/v1/room/?limit=1000')
        .then(response =>{
            commit('setAllRooms',{ rooms: response.data.results });
        })
        .catch(error => {
            console.log(error)
        })
    },

    async getRoom({ commit }, payload){
        await axios.get(`http://128.199.137.150/api/v1/room/${payload.id}/`, {}, 
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
        await axios.post('http://128.199.137.150/api/v1/room/' , payload.data,
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
        await axios.patch(`http://128.199.137.150/api/v1/room/${payload.data.id}/`, payload.data, 
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
    }

};

export default {
    state,
    getters,
    actions,
    mutations
}



