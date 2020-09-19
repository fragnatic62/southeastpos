<template>
    <v-sheet
    class="main-container"
    color="grey lighten-3"
    >
        <v-data-table
        :headers="headers"
        :items="this.rooms"
        sort-by="id"
        class="elevation-1"
        >
            <template v-slot:top>
            <v-toolbar height="140" flat color="white">
                <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    >New Item</v-btn>
                    <span class="header-text">
                      <strong>List of rooms</strong>
                    </span>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                    <v-container>
                        <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field :rules="rules.room_no" required v-model="editedItem.room_no" label="Room name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field :rules="rules.floor_no" required v-model="editedItem.floor_no" label="Floor Number"></v-text-field>
                        </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
            </template>
            <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
    </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  data () {
    return {
      dialog: false,
      rules: {
          room_no: [val => (val || '').length > 0 || 'This field is required'],
          floor_no: [val => (val || '').length > 0 || 'This field is required'],
        },
      headers: [
        { 
          text: 'Id', 
          value: 'id',
          sortable: false
        },
        {
          text: 'Room Number',
          align: 'start',
          sortable: false,
          value: 'room_no',
        },
        { text: 'Floor Number', value: 'floor_no' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      rooms: [],
      editedIndex: -1,
      editedItem: {
        room_no: '',
        floor_no: '',
      },
      defaultItem: {
        room_no: '',
        floor_no: '',
      },
    }
  },

  computed: {
    ...mapGetters(['allRooms','getAccessToken','updatedRoom','newRoom']),
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },

  async created () {
    await this.fetchRooms()
    this.initialize()
  },

  methods: {
    ...mapActions(['fetchRooms','addRoom','updateRoom']),
    initialize () {
      this.rooms = this.allRooms
    },

    editItem (item) {
      this.editedIndex = this.rooms.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.rooms.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.rooms.splice(index, 1)
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save () {
      if (this.editedIndex > -1) {

        await this.updateRoom({token:this.getAccessToken,data:this.editedItem})
        Object.assign(this.rooms[this.editedIndex], this.updatedRoom)

      } else {

        await this.addRoom({token:this.getAccessToken,data:this.editedItem})
        this.rooms.push(this.newRoom)

      }
      await this.fetchRooms()
      this.close()
    },
  },
}
</script>

<style>
.main-container {
    height: 727px;
    margin-left: 265px !important;
    margin-right: 5px;
    margin-top: 13px;
}

.header-text{
  margin-left: 35%;
}

</style>