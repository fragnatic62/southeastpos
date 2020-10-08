<template>
  <v-dialog
    v-model="dialog"
    max-width="250px"
  >
    <v-card width="100%">
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

</style>