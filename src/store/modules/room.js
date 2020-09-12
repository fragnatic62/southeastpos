import axios from 'axios'


const state = {
    rooms: [],
    to_edit: {}
};

const getters = {
    allRooms: (state) => state.rooms,
    editableData: (state) => state.to_edit
};

const actions = {
    async fetchRooms ({ commit }, token) {
        let headers = {
            Authorization: `Bearer ${token}`
        }
        await axios.get('http://128.199.137.150/api/v1/room/?limit=8', { headers: headers })
        .then(response => {
            commit('setRooms' , response.data)
        })
        .catch(error => {
            console.log(error)
        })
    },

    async updateRoomData({ commit },payload){
        console.log(payload.data)
        let headers = {
            Authorization: `Bearer ${payload.token}`
        }
        await axios.patch(`http://128.199.137.150/api/v1/room/${payload.data.id}/`, payload.data,
            {
                headers: headers
            }
        )
        .then(response =>{
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    },

    fetchEditableData({ commit }, payload) {
        commit('setEditableData',payload)
    },
};

const mutations = {
    setRooms: (state, rooms) => (state.rooms = rooms),
    setEditableData: (state, editableData) => (state.to_edit = editableData)
};

export default {
    state,
    getters,
    actions,
    mutations
}


