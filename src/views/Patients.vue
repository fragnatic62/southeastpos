<template>
    <v-sheet
    class="main-container"
    >
        <v-data-table
        :headers="headers"
        :items="patients"
        sort-by="id"
        class="elevation-1"
        >
            <template v-slot:top>
            <v-toolbar flat color="white">
                <v-dialog v-model="dialog" height="85%" max-width="800px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    >New Item</v-btn>
                    <span class="header-text">
                      <strong>List of Patients</strong>
                    </span>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                    <v-container>
                        <v-row>
                          <v-col cols="6">
                              <v-text-field v-model="editedItem.first_name" label="First name"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                              <v-text-field v-model="editedItem.middle_name" label="Middle name"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                              <v-text-field v-model="editedItem.last_name" label="Last name"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                              <v-text-field v-model="editedItem.contact_no" label="Contact number"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                              <v-text-field v-model="editedItem.age" label="Age"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                              <v-text-field v-model="editedItem.gender" label="Gender"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                              <v-text-field v-model="editedItem.occupation" label="Occupation"></v-text-field>
                          </v-col>
                          <v-col
                            cols="6"
                          >
                            <v-textarea
                              name="input-7-1"
                              label="Address"
                              v-model="editedItem.address"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="close">Cancel</v-btn>
                    <v-btn color="error" @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
            <v-btn 
              small 
              class="ma-2" 
              color="success"
              @click="editItem(item)"
            >
              <v-icon left>mdi-pencil</v-icon> Edit
            </v-btn>

            <v-btn 
              small 
              class="ma-2" 
              color="error"
              @click="deleteItem(item)"
            >
              <v-icon left>mdi-trash-can-outline</v-icon> Delete
            </v-btn>

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
          text: 'Full name',
          align: 'start',
          sortable: false,
          value: 'first_name',
        },
        { text: 'Contact Number', value: 'contact_no' },
        { text: 'Age', value: 'age' },
        { text: 'Gender', value: 'gender' },
        { text: 'Occupation', value: 'occupation' },
        { text: 'Address', value: 'address' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      patients: [],
      editedIndex: -1,
      editedItem: {
        first_name: '',
        middle_name: '',
        last_name: '',
        contact_no: '',
        age: '',
        gender: '',
        address: '',
      },
      defaultItem: {
        first_name: '',
        middle_name: '',
        last_name: '',
        contact_no: '',
        age: '',
        gender: '',
        address: '',
      },
    }
  },

  computed: {
    ...mapGetters(['allPatients','newPatient','updatedPatient','getAccessToken']),
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
    await this.fetchPatients()
    this.initialize()
  },

  methods: {
    ...mapActions(['fetchPatients','addPatient','updatePatient']),
    initialize () {
      this.patients = this.allPatients
    },

    editItem (item) {
      this.editedIndex = this.patients.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.patients.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.patients.splice(index, 1)
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

        await this.updatePatient({token:this.getAccessToken,data:this.editedItem})
        console.log(this.updatedPatient)
        Object.assign(this.patients[this.editedIndex], this.updatedPatient)

      } else {

        await this.addPatient({token:this.getAccessToken,data:this.editedItem})
        this.patients.push(this.newPatient)

      }
      this.close()
    },

    newAppointment (item){
      this.$router.push(`/newappointment/${item.id}`)
    },
    viewAppointment (item){
      this.$router.push(`/viewappointment/${item.id}`)
    }
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