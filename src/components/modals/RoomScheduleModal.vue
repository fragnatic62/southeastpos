<template>
  <v-dialog
    v-model="dialog"
    max-width="760px"
  >
    <v-card class="card-dialog">
      <v-row class="row-container">
        <v-col class="pa-0 ml-10 mt-6 mr-6 mb-6" cols="11">
          <v-data-table
              :headers="room_headers"
              :items="rooms"
              sort-by="calories"
              class="elevation-1"
              :hide-default-footer="true"
            >
            <template v-slot:item.actions="{ item }">
              <v-btn
                x-small
                color="success"
                class="ma-0 pa-2"
                dark
                @click=""
              >
                Select Date/Time
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row class="row-container">
        <v-col class="pa-0 ml-10 mt-6 mr-6 mb-6" cols="11">
          <v-data-table
              :headers="room_headers"
              :items="rooms"
              sort-by="calories"
              class="elevation-1"
              :hide-default-footer="true"
            >
            <template v-slot:item.actions="{ item }">
              <v-btn
                x-small
                color="success"
                class="ma-0 pa-2"
                dark
                @click=""
              >
                Select Date/Time
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

  export default {
    data () {
      return { 
          dialog: false,
          occupied_rooms: [],
          rooms: [],
          room_headers: [
          {
            text: 'Rooms',
            align: 'center',
            sortable: false,
            value: 'room_no',
          },
          { text: 'Actions', value: 'actions', align: 'center'},
          ],
      }
    },
    props:['session'],
    computed: {
      ...mapGetters([
        'getOccupiedRooms', 
        'allRooms']),
    },
    methods: {
      ...mapActions([
        'fetchOccupiedRooms',
        'fetchRooms', 
        'updateSession']),
      initialize () {
        console.log(this.allRooms)
        this.rooms = this.allRooms
      },
      open() {
          this.dialog = true
      },
      close () {
          this.dialog = false
      }
    },

    watch:{
      async session(val){
        await this.fetchRooms()
        this.initialize()
      }
    },

    async created () {

    }
  }
</script>

<style scoped>
  .row-container{
    width: 100% !important;
  }
  .card-dialog {
    width: 100%;
    max-height: 100%;
  }
</style>