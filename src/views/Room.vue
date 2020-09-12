<template>
  <v-container class="room-container pa-0">
      <v-row class="pt-0 pb-0">
        <v-col
        v-for="room in this.allRooms.results"
        :key="room.id"
        cols="3"
        >
        <template>
          <v-card
          class="mx-auto"
          max-width="400"
          >
            <v-img
            height="200px"
            max-width="250"
            src="https://www.novelupdates.com/img/noimagefound.jpg"
            >
            </v-img>

            <v-card-text class="text--primary">
              <v-chip>Room: {{ room.room_no }}/Floor No.: {{ room.floor_no }}</v-chip>
              <div class="text-description"></div>
            </v-card-text>
            <v-card-actions>
              <RoomForm @editNow="editItem(room)" />
            </v-card-actions>
          </v-card>
        </template>
      </v-col>
    </v-row>  
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import RoomForm from "../components/Forms/RoomForm"

export default {
  components: {
    RoomForm: RoomForm
  },
  data () {
    return {
      dialog: false,
      editedItem: {}
    }
  },
  computed: mapGetters(['allRooms', 'getAccessToken']),
  methods: {
    ...mapActions(['fetchRooms', 'fetchEditableData']),
    // This function trigger via emit call from child component form
    // This wil commit the row data into the vuex store
    editItem (row) {
      console.log(row)
      let row_data =  {
        id: row.id,
        floor_no: row.floor_no,
        location: row.location,
        room_no: row.room_no,
        }
      console.log(row_data)
      this.editedItem = {
          ...row_data
        }
      console.log(this.editedItem)
      this.dialog = true
      this.fetchEditableData(this.editedItem)
      this.fetchRooms(this.getAccessToken, null)
    },
    deleteItem (row) {
      this.editedItem = {
          ...row
        }
      console.log(this.editedItem)
    }
  },
  created () {
    this.fetchRooms(this.getAccessToken, null)
  }
}
</script>

<style>
 .patients {
   left: 25%;
 }
.room-container{
    width: 80%;
    margin-left: 17%;
  }
  .v-card__title {
    font-size: medium;
  }

  .pt-0 {
    padding-bottom: unset;
  }
</style>