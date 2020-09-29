<template>
    <v-sheet
    class="main-container"
    >
        <v-data-table
        :headers="headers"
        :items="machines"
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
                      <strong>List of Machines</strong>
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
                            <v-text-field v-model="editedItem.name" label="Machine name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.model" label="Model"></v-text-field>
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
      headers: [
        { 
          text: 'Id', 
          value: 'id',
          sortable: false,
        },
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Model', value: 'model' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      machines: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        model: ''
      },
      defaultItem: {
        name: '',
        model: ''
      },
    }
  },

  computed: {
    ...mapGetters(['allMachines','getAccessToken','updatedMachine','newMachine']),
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
    await this.fetchMachines()
    this.initialize()
  },

  methods: {
    ...mapActions(['fetchMachines','addMachine','updateMachine']),
    initialize () {
      this.machines = this.allMachines
    },

    editItem (item) {
      this.editedIndex = this.machines.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
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

        await this.updateMachine({token:this.getAccessToken,data:this.editedItem})
        Object.assign(this.machines[this.editedIndex], this.updatedMachine)

      } else {
        await this.addMachine({token:this.getAccessToken,data:this.editedItem})
        this.machines.push(this.newMachine)

      }
      this.close()
    },
  },
}
</script>

<style scoped>
.main-container {
    height: 727px;
    margin-left: 100px !important;
    margin-right: 100px;
    margin-top: 13px;
}

.header-text{
  margin-left: 35%;
}
</style>