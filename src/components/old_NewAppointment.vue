<template>
    <v-sheet
    class="main-container"
    >
      <v-row>
        <v-col cols="4">
                <v-card
                    class="mx-auto"
                    color="#FFFFFF"
                >
                    <v-container class="text-center pa-0">
                        <v-card
                        class="user-card text-center rounded-circle d-inline-flex align-center justify-center ma-3"
                        height="100"
                        width=100
                        elevation="7"
                        >
                            <v-icon x-large>mdi-account-star</v-icon>
                        </v-card>
                    </v-container>
                    <v-container class="text-center pa-0">
                        <v-list-item-content>
                            <v-list-item-title >
                                <strong>
                                {{ this.User.first_name }} 
                                {{ this.User.last_name }}
                                </strong>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-container>
                    <v-container class="text-left pa-0">
                        <v-list-item @click="">
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-email</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>{{this.User.contact_no}}</v-list-item-title>
                                <v-list-item-subtitle>Contact Number</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item @click="">
                            <v-list-item-icon>
                                <v-icon v-if="this.stringToLower(this.User.gender) === 'female'" color="indigo">mdi-gender-female</v-icon>
                                <v-icon v-else-if="this.stringToLower(this.User.gender) === 'male'" color="indigo">mdi-gender-male</v-icon>
                                <v-icon v-else color="indigo">mdi-gender-male-female</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>{{this.User.gender}}</v-list-item-title>
                                <v-list-item-subtitle>Gender</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item @click="">
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-email</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>{{this.User.age}}</v-list-item-title>
                                <v-list-item-subtitle>Age</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item @click="">
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-email</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>{{this.User.occupation}}</v-list-item-title>
                                <v-list-item-subtitle>Occupation</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item @click="">
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-email</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>{{this.User.address}}</v-list-item-title>
                                <v-list-item-subtitle>Address</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-container>
                    <v-card-actions>
                    </v-card-actions>
                </v-card>
        </v-col>
        <v-col cols="7">
            <v-row>
                <v-card
                    class="mx-auto"
                    color="#FFFFFF"
                >
                    <v-form class="ml-5 mr-5">
                        <v-container>
                            <v-row>

                                <v-col cols="12" sm="6" md="6">
                                    <v-select
                                    v-model="selected_procedure"
                                    :items="procedures"
                                    item-value="id"
                                    item-text= "name"
                                    label="Procedure"
                                    ></v-select>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                    <v-select
                                    v-model="selected_interval"
                                    :items="session_interval_list"
                                    label="Days Interval"
                                    ></v-select>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                v-model="number_of_session"
                                    label="Number of sessions"
                                ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-menu
                                    ref="datePicker"
                                    v-model="datePicker"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        v-model="dateFormatted"
                                        label="Session starting date"
                                        hint="MM/DD/YYYY format"
                                        persistent-hint
                                        prepend-icon="mdi-calendar-check"
                                        v-bind="attrs"
                                        @blur="selected_date = parseDate(dateFormatted)"
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                        <v-date-picker v-model="selected_date" no-title @input="datePicker = false"></v-date-picker>
                                    </v-menu>
                                </v-col>

                                <v-btn
                                class="ma-2"
                                color="success"
                                @click="saveSession()"
                                >
                                    Save
                                </v-btn>

                                <v-btn
                                class="ma-2"
                                color="success"
                                >
                                    Cancel
                                </v-btn>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card>
            </v-row>

            <v-row>
                <v-data-table
                :headers="headers"
                :items="appointment_sessions"
                sort-by="calories"
                class="data-table elevation-1 mt-4"
                >
                    <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-dialog v-model="dialog" max-width="700px">
                        <v-card>
                            <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                            <v-container>
                                <v-row>
                                <v-col cols="12">
                                    <v-menu
                                    ref="datePicker1"
                                    v-model="datePicker1"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        v-model="editedItem.date"
                                        label="Session starting date"
                                        hint="MM/DD/YYYY format"
                                        persistent-hint
                                        prepend-icon="mdi-calendar-check"
                                        v-bind="attrs"
                                        @blur="selected_date1 = parseDate(dateFormatted1)"
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                        <v-date-picker v-model="selected_date1" no-title @input="datePicker1 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-select
                                    v-model="editedItem.room"
                                    :items="rooms"
                                    item-value="id"
                                    item-text= "room_no"
                                    label="Room"
                                    prepend-icon="mdi-home-circle-outline"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-select
                                    v-model="editedItem.machine"
                                    :items="machines"
                                    item-value="id"
                                    item-text= "name"
                                    label="Machine"
                                    prepend-icon="mdi-cog-transfer-outline"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-select
                                    v-model="editedItem.start_time"
                                    :items="time_list"
                                    label="Start time"
                                    prepend-icon="mdi-clock-in"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-select
                                    v-model="editedItem.end_time"
                                    :items="time_list"
                                    label="End time"
                                    prepend-icon="mdi-clock-out"
                                    ></v-select>
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
                        @click="confirmDelete()"
                    >
                        mdi-delete
                    </v-icon>
                    <v-snackbar
                            v-model="snackbar"
                            >
                            Do you want to delete this item ?
                            <template v-slot:action="{ attrs }">
                                <v-btn
                                color="pink"
                                text
                                v-bind="attrs"
                                @click="deleteItem(item)"
                                >
                                Ok
                                </v-btn>
                                <v-btn
                                color="pink"
                                text
                                @click="this.snackbar = false"
                                >
                                Cancel
                                </v-btn>
                            </template>
                        </v-snackbar>
                    </template>
                </v-data-table>
            </v-row>
        </v-col>
      </v-row>
    </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
    data: vm => ({
        selected_date: new Date().toISOString().substr(0, 10),
        selected_date1: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        dateFormatted1: vm.formatDate(new Date().toISOString().substr(0, 10)),
        start_time: null,
        snackbar: false,
        end_time: null,
        datePicker: false,
        datePicker1: false,
        User: {},
        session_interval_list:[1,2,3,4,5,6,7,8,9,10],
        time_list:[
            '7:00 AM','7:30 AM', '8:00 AM','8:30 AM', '9:00 AM',
            '9:30 AM', '10:00 AM','10:30 AM', '11:00 AM','11:30 AM',
            '12:00 NOON','12:30 NOON','1:00 PM','1:30 PM','2:00 PM', 
            '2:30 PM', '3:00 PM','3:30 PM', '4:00 PM','4:30 PM',
            '5:00 PM', '5:30 PM', '6:00 PM'
            ],
        selected_interval:null,
        number_of_session: null,
        procedures: [],
        rooms:[],
        machines:[],
        selected_procedure: null,
        selected_room: null,
        selected_machine: null,
        dialog: false,
        headers: [
            { 
                text: 'Id', 
                value: 'id',
                sortable: false,
            },
            {
            text: 'Date',
            align: 'start',
            sortable: false,
            value: 'date',
            },
            { text: 'Start time', value: 'start_time' },
            { text: 'End time', value: 'end_time' },
            { text: 'Room', value: 'room' },
            { text: 'Machine', value: 'machine' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        appointment_sessions: [],
        editedIndex: -1,
        editedItem: {},
    }),
    props:['id'],
    methods: {
        ...mapActions([
            'fetchUser','createSession','deleteSession',
            'fetchProcedures', 'fetchRooms','fetchMachines',
            'updateSession','deleteSession','getRoom','getMachine'
            ]),
        initialize () {
            this.User = {
                ...this.getUser
            }
            this.procedures = this.allProcedures
            this.rooms = this.allRooms
            this.machines = this.allMachines
        },
        editItem (item) {
            this.editedIndex = this.appointment_sessions.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        confirmDelete () {
            this.snackbar = true
        },
        deleteItem (item) {
            console.log(item)
            const index = this.appointment_sessions.indexOf(item)
            this.appointment_sessions.splice(index, 1)

            this.deleteSession({token:this.getAccessToken,id:item.id})
            this.snackbar = false
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
                await this.updateSession({token:this.getAccessToken,data:this.editedItem})
                await this.getRoom({token:this.getAccessToken,id:this.editedItem.room})
                await this.getMachine({token:this.getAccessToken,id:this.editedItem.machine})
                let partial = {
                    ...this.getUpdatedAppointmentSessions
                }
                partial.room = this.getUsedRoom.room_no
                partial.machine = this.getUsedMachine.name
                Object.assign(this.appointment_sessions[this.editedIndex], partial)

            }
            this.close()
        },
        stringToLower (string_value) {
            if(string_value != undefined){ 
                return string_value.toLowerCase()
            }
        },
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        },
        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        clearFields () {
            this.selected_procedure = null
            this.selected_interval = null
            this.number_of_session = null
            this.selected_date = null
        },
        async saveSession () {
            let payload = {
                token: this.getAccessToken,
                data: {
                    patient: this.id,
                    procedure: this.selected_procedure,
                    session_interval: this.selected_interval,
                    number_of_session: this.number_of_session,
                    start_date: this.selected_date
                }
            }
            await this.createSession(payload)
            this.clearFields()
            this.appointment_sessions = this.getAppointmentSessions
        }
    },
    computed: {
        ...mapGetters([
            'getUser','getSession',
            'getAppointmentSessions',
            'allProcedures','getAccessToken',
            'allMachines', 'allRooms',
            'getUpdatedAppointmentSessions','getUsedRoom',
            'getUsedMachine'
            ]),
        computedDateFormatted () {
            return this.formatDate(this.selected_date)
        },
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },
    watch: {
      selected_date (val) {
        this.dateFormatted = this.formatDate(this.selected_date)
      },
      selected_date1 (val) {
          this.dateFormatted1 = this.formatDate(this.selected_date1)
      },
      dialog (val) {
        val || this.close()
      },
    },
    async created () {
        await this.fetchUser({user_id: this.id, token: this.getAccessToken})
        await this.fetchProcedures()
        await this.fetchRooms()
        await this.fetchMachines()
        this.initialize()
    }
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