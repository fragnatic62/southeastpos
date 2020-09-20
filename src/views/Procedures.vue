<template>
    <v-sheet
    class="main-container"
    color="grey lighten-3"
    >
        <v-data-table
        :headers="headers"
        :items="procedures"
        sort-by="id"
        class="elevation-1"
        >
            <template v-slot:top>
            <v-toolbar flat color="white">
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
                      <strong>List of Procedures</strong>
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
                            <v-text-field v-model="editedItem.name" label="Procedure name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
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
          text: 'Procedure name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Description', value: 'description' },
        { text: 'Price', value: 'price' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      procedures: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        description: null,
        price: 0,
      },
      defaultItem: {
        name: '',
        description: null,
        price: 0,
      },
    }
  },

  computed: {
    ...mapGetters(['allProcedures','newProcedures','updatedProcedures','getAccessToken']),
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
    await this.fetchProcedures()
    this.initialize()
  },

  methods: {
    ...mapActions(['fetchProcedures','addProcedure','updateProcedure']),
    initialize () {
      this.procedures = this.allProcedures
    },

    editItem (item) {
      this.editedIndex = this.procedures.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.procedures.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.procedures.splice(index, 1)
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

        await this.updateProcedure({token:this.getAccessToken,data:this.editedItem})
        Object.assign(this.procedures[this.editedIndex], this.updatedProcedures)

      } else {

        await this.addProcedure({token:this.getAccessToken,data:this.editedItem})
        this.procedures.push(this.newProcedures)

      }
      await this.fetchProcedures()
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

</style>