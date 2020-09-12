<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <template v-slot:activator="{ on, attrs }">
        <div class="update-btn">
          <v-btn
          small 
          color="primary"
          v-bind="attrs"
          v-on="on"
          @click="editData"
          >
          Update
          </v-btn>
        </div>
        <div>
          <v-btn
          small 
          color="error"
          v-bind="attrs"
          v-on="on"
          >
            Delete
          </v-btn>
        </div>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Update Room Information</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="9">
                <v-text-field v-model="room_no" label="Room Name" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="9">
                <v-text-field v-model="floor_no" label="Floor No."></v-text-field>
              </v-col>
              <v-col cols="12" sm="9">
                <v-text-field v-model="location" label="Location"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="6">
            <v-btn class="mx-2" small color="warning darken-1" @click="onSave">Save</v-btn>
            <v-btn class="mx-2" small color="primary darken-1" @click="dialog = false">Close</v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  data () {
    return { 
      dialog: false,
      id:'',
      room_no: '',
      floor_no: '',
      location: ''
    }
  },
  computed: mapGetters(['getAccessToken', 'editableData','allRooms']),
  methods: {
    ...mapActions(['updateRoomData','fetchRooms']),
    editData() {
      this.$emit('editNow')
    },
    onSave() {
      let payload = {
        id: this.id,
        room_no: this.room_no,
        floor_no: this.floor_no,
        location: this.location
      }
      this.dialog = false
      this.updateRoomData({data:payload,token:this.getAccessToken})
      this.fetchRooms(this.getAccessToken)
    }
  },
  watch: {
    editableData (editableData) {
      this.id = editableData.id
      this.room_no = editableData.room_no
      this.floor_no = editableData.floor_no,
      this.location = editableData.location
    }
  }
}
</script>


<style>
.update-btn {
  padding-left: 10px;
  padding-right: 10px;
}
</style>