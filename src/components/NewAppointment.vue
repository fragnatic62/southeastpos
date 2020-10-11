<template>
  <v-sheet>
    <v-row>
      <v-col cols="3" class="pr-0">
        <v-sheet class="ml-2" height="628" width="370" elevation="4">
          <v-data-table
            :headers="patient_headers"
            :items="patient_list"
            :hide-default-footer="true"
            class="elevation-1 custom-data-table"
          >
            <template v-slot:item.name="{ item }">
              <td>{{ item.first_name }} {{item.last_name}}</td>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                x-small
                color="success"
                class="ma-1 pa-2"
                dark
                @click="patientSelected(item)"
                width="80"
              >
                New session
              </v-btn>
              <v-btn
                x-small
                color="success"
                class="ma-1 pa-2"
                dark
                width="80"
                @click="alert('Not implemeneted yet')"
              >
                All sessions
              </v-btn>
            </template>
          </v-data-table>
        </v-sheet>
      </v-col>
      <v-col cols="2" class="pr-0 pl-5">
        <v-sheet class="ml-0" height="628" width="220" elevation="4">
          <v-data-table
            :headers="room_headers"
            :items="room_list"
            :hide-default-footer="true"
            class="elevation-1"
          >
            <template v-slot:item.actions = "{ item }">
              <v-btn
                x-small
                color="success"
                class="ma-0 pa-2"
                dark
                @click="roomSelected(item)"
              >
                Select Date/Time
              </v-btn>
            </template>
          </v-data-table>
          <template>
            <v-row justify="center">
              <v-dialog
                v-model="room_dialog"
                scrollable
                max-width="500px"
                width="500"
              >
                <v-card>
                  <v-card-title>{{selected_room_schedule.room_no}} current schedules</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text style="height: 300px;">
                    <v-row>
                      <v-col cols="4">
                        <v-text-field 
                          v-model="room_selected_date" 
                          label="Selected date" 
                          hint="MM/DD/YYYY" 
                          prepend-icon="mdi-calendar"
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-select
                          class="time-list"
                          v-model="room_start_time"
                          :items="time_list"
                          label="Start time"
                          prepend-icon="mdi-clock-in"
                        ></v-select>
                      </v-col>
                      <v-col cols="4">
                        <v-select
                          class="time-list"
                          v-model="room_end_time"
                          :items="time_list"
                          label="End time"
                          prepend-icon="mdi-clock-out"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-data-table
                      :headers="selected_room_headers"
                      :items="selected_room_schedules"
                      class="elevation-1 mt-1"
                      :hide-default-footer="true"
                    ></v-data-table>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="room_dialog = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="updateRoomOnSelectedSession()"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </template>
        </v-sheet>
      </v-col>
      <v-col cols="2" class="pl-0 pr-0">
        <v-sheet class="ml-0" height="628" width="250" elevation="4">
          <v-data-table
            :headers="machine_headers"
            :items="machine_list"
            :hide-default-footer="true"
            class="elevation-1"
          >
             <template v-slot:item.actions="{ item }">
              <v-btn
                x-small
                color="success"
                class="ma-1 pa-2"
                dark
                @click="machineSelected(item)"
              >
                Select Date/Time
              </v-btn>
            </template>
          </v-data-table>
          <template>
              <v-row justify="center">
                <v-dialog
                  v-model="machine_dialog"
                  scrollable
                  max-width="500px"
                  width="500"
                >
                  <v-card>
                    <v-card-title>{{selected_machine_schedule.name}} current schedules</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text style="height: 300px;">
                      <v-row>
                        <v-col cols="4">
                          <v-text-field 
                            v-model="room_selected_date" 
                            label="Selected date" 
                            hint="MM/DD/YYYY" 
                            prepend-icon="mdi-calendar" 
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-select
                            class="time-list"
                            v-model="machine_start_time"
                            :items="time_list"
                            label="Start time"
                            prepend-icon="mdi-clock-in"
                          ></v-select>
                        </v-col>
                        <v-col cols="4">
                          <v-select
                            class="time-list"
                            v-model="machine_end_time"
                            :items="time_list"
                            label="End time"
                            prepend-icon="mdi-clock-out"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-data-table
                        :headers="selected_machine_headers"
                        :items="selected_machine_schedules"
                        class="elevation-1 mt-1"
                        :hide-default-footer="true"
                      ></v-data-table>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="machine_dialog = false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="updateMachineOnSelectedSession()"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </template>
        </v-sheet>
      </v-col>
      <v-col cols="5" class="pl-5">
        <v-row>
         <v-sheet class="mb-2" height="270" width="619" elevation="4">
           <template>
            <v-form v-model="valid">
              <v-container>
                <v-row>
                  <v-col
                    cols="6"
                  >
                    <v-chip
                      label
                      color="green"
                      outlined
                    >
                      Patient Name: {{ `${first_name} ${last_name}` }}
                    </v-chip>
                  </v-col>
                  <v-col
                    cols="2"
                  >
                    <v-chip
                      label
                      color="green"
                      outlined
                    >
                      Age: {{ age }}
                    </v-chip>
                  </v-col>
                  <v-col
                    cols="4"
                  >
                    <v-chip
                      label
                      color="green"
                      outlined
                    >
                      Gender: {{ gender }}
                    </v-chip>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="4"
                    class="pt-0 pb-0 pl-10"
                  >
                    <v-select
                      v-model="selected_procedure"
                      :items="procedure_list"
                      item-value="id"
                      item-text= "name"
                      label="Procedure"
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="4"
                    class="pt-0 pb-0"
                  >
                    <v-text-field
                      v-model="session_count"
                      label="Sessions count"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="4"
                    class="pt-0 pb-0 pr-15"
                  >
                    <v-text-field
                      v-model="days_interval"
                      label="Days Interval"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="4"
                    class="pt-0 pb-0 pl-10"
                  >
                    <v-menu
                      ref="session_start_date_menu"
                      v-model="session_start_date_menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="selected_start_date"
                          label="Start Date"
                          hint="MM/DD/YYYY"
                          persistent-hint
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          @blur="date = parseDate(selected_start_date)"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        no-title
                        @input="session_start_date_menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="6"
                  >
                  </v-col>
                  <v-col
                  class="pa-0"
                  cols="3"
                  >
                    <div>
                      <v-btn
                        small
                        color="success"
                        dark
                        width="150"
                        @click="generatedSessions"
                      >
                        Generate Sessions
                      </v-btn>
                    </div>
                     <template>
                      <v-card>
                        <v-snackbar
                          v-model="snackbar"
                          :color="color"
                          :timeout="timeout"
                          top
                        >
                          {{ text }}

                          <template v-slot:action="{ attrs }">
                            <v-btn
                              dark
                              text
                              v-bind="attrs"
                              @click="snackbar = false"
                            >
                              Close
                            </v-btn>
                          </template>
                        </v-snackbar>
                      </v-card>
                    </template>
                    </v-col>
                    <v-col
                      class="pa-0"
                      cols="1"
                    >
                      <div>
                        <v-btn
                          small
                          color="warning"
                          dark
                          width="150"
                          @click="clearSessionsFields"
                        >
                          Clear
                        </v-btn>
                    </div>
                  </v-col>
                </v-row>
                
              </v-container>
            </v-form>
          </template>
         </v-sheet>
        </v-row>
        <v-row>
          <v-sheet class="mb-2" width="619" elevation="4">
            <v-data-table
              v-model="selected"
              :headers="generated_sessions_headers"
              :items="generated_sessions"
              :hide-default-footer="true"
              selectable-key ="id" 
              single-select
              item-key="id"
              show-select
              class="elevation-1"
            >
            <template v-slot:item.date="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="black"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    text
                    x-small
                    depressed
                    @click="date_dialog = true"
                  >
                    {{ item.date }}
                  </v-btn>
                </template>
                <v-dialog
                  v-model="date_dialog"
                  max-width="261px"
                >
                  <v-card>
                    <v-card-title>
                      <v-menu
                        v-model="menu_datepicker_update"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="260px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="update_date"
                            label="Select date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="update_date"
                          @input="updateSessionDate(item)"
                        ></v-date-picker>
                      </v-menu>
                    </v-card-title>
                  </v-card>
                </v-dialog>
                <span>Click to update</span>
              </v-tooltip>
            </template>
            </v-data-table>
            <div class="text-center pt-2">
              <v-row>
                <v-col cols="4">
                  <span>
                    <small>Note: Click date to update</small>
                  </span>
                </v-col>
                <v-col cols="4">
                  <v-btn
                    small
                    color="success" 
                    class="ma-2"
                    @click="resetGeneratedSessionsTable"
                  >
                    Finalize
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-sheet>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

  export default {
    data () {
      return {
        menu_datepicker_update: false,
        date_dialog:false,
        isEditing: false,
        color: '',
        snackbar: false,
        text: '',
        timeout: 3000,
        editedIndex: -1,
        editedItem: {},
        selected: [],
        room_date_menu: false,
        machine_date_menu: false,
        room_dialog:false,
        machine_dialog:false,
        session_start_date_menu: false,
        update_date: new Date().toISOString().substr(0, 10),
        date: new Date().toISOString().substr(0, 10),
        selected_start_date: this.formatDate(new Date().toISOString().substr(0, 10)),
        room_date: new Date().toISOString().substr(0, 10),
        room_selected_date: this.formatDate(new Date().toISOString().substr(0, 10)),
        machine_date: new Date().toISOString().substr(0, 10),
        machine_selected_date: this.formatDate(new Date().toISOString().substr(0, 10)),
        room_start_time:'',
        room_end_time:'',
        machine_start_time:'',
        machine_end_time:'',
        selected_room_schedule:{
          room_no:''
        },
        selected_machine_schedule:{
          name:''
        },
        selected_procedure:'',
        valid:'',
        selected_patient:{},
        first_name: '',
        last_name:'',
        age:'',
        gender:'',
        procedure:'',
        session_count:'',
        days_interval:'',
        session_start_date:'',
        procedure_list:[],
        generated_sessions:[],
        room_list:[],
        patient_list:[],
        machine_list:[],
        selected_room_schedules:[],
        selected_machine_schedules:[],
        time_list:[
            '7:00 AM','7:30 AM', '8:00 AM','8:30 AM', '9:00 AM',
            '9:30 AM', '10:00 AM','10:30 AM', '11:00 AM','11:30 AM',
            '12:00 NOON','12:30 NOON','1:00 PM','1:30 PM','2:00 PM', 
            '2:30 PM', '3:00 PM','3:30 PM', '4:00 PM','4:30 PM',
            '5:00 PM', '5:30 PM', '6:00 PM'
            ],
        selected_room_headers:[
          {
            text: 'Date',
            align: 'start',
            sortable: false,
            value: 'date',
          },
          { text: 'Start Time', value: 'room_start_time' },
          { text: 'End Time', value: 'room_end_time' },
        ],
        selected_machine_headers:[
          {
            text: 'Date',
            align: 'start',
            sortable: false,
            value: 'date',
          },
          { text: 'Start Time', value: 'machine_start_time' },
          { text: 'End Time', value: 'machine_end_time' },
        ],
        patient_headers: [
          {
            text: 'Patient',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Age', value: 'age' },
          { text: 'Gender', value: 'gender' },
          { text: 'Actions', value: 'actions' },
        ],
        room_headers: [
          {
            text: 'Rooms',
            align: 'center',
            sortable: false,
            value: 'room_no',
          },
          { text: 'Actions', value: 'actions' },
        ],
        machine_headers: [
          {
            text: 'Machine',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Actions', value: 'actions' },
        ],
        generated_sessions_headers: [
          {
            text: 'Session Date',
            align: 'start',
            sortable: false,
            value: 'date',
          },
          { text: 'Room', sortable: false, value: 'room' },
          { text: 'Room Start Time', sortable: false, value: 'room_start_time' },
          { text: 'Room End Time', sortable: false, value: 'room_end_time' },
          { text: 'Machine', sortable: false, value: 'machine' },
          { text: 'Machine Start Time', sortable: false, value: 'machine_start_time' },
          { text: 'Machine End Time', sortable: false, value: 'machine_end_time' }
        ],
      }
    },
    watch: {
      date (val) {
        this.selected_start_date = this.formatDate(this.date)
        this.machine_selected_date = this.formatDate(this.date)
        this.room_selected_date = this.formatDate(this.date)
      },
      selected (val){
        this.editedIndex = this.generated_sessions.indexOf(val[0])
        this.editedItem = Object.assign({}, val[0])
      }
    },
    beforeMount() {
        window.addEventListener("beforeunload", this.preventNav);
        this.$once("hook:beforeDestroy", () => {
          window.removeEventListener("beforeunload", this.preventNav);
        });
      },
    beforeRouteLeave(to, from, next) {
        if (this.isEditing) {
          if (!window.confirm("Leave without saving?")) {
            return;
          }
        }
        next();
      },
    computed: {
      ...mapGetters([
        'getOccupiedRooms','getAccessToken','allRooms',
        'allPatients','getOccupiedMachine','allMachines','getAccessToken',
        'allProcedures','getAppointmentSessions','getUpdatedAppointmentSessions']),
        computedDateFormatted () {
          return this.formatDate(this.date)
        },
    },
    methods:{
      ...mapActions([
        'fetchOccupiedRooms', 'fetchRooms','fetchPatients',
        'fetchOccupiedMachine','fetchMachines','fetchProcedures',
        'createSession', 'updateSession']),
      resetGeneratedSessionsTable(){
        this.generated_sessions = []
      },
      preventNav(event) {
        if (!this.isEditing) return;
        event.preventDefault();
        // Chrome requires returnValue to be set.
        event.returnValue = "";
      },
      initializeRooms () {
        this.room_list = this.allRooms
      },
      initializePatients () {
        this.patient_list = this.allPatients
      },
      initializeMachines (){
        this.machine_list = this.allMachines
      },
      initializeProcedures () {
        this.procedure_list = this.allProcedures
      },
      async roomSelected (item) {
        this.selected_room_schedule = item
        await this.fetchOccupiedRooms({data:{id: item.id}, token:this.getAccessToken})
        this.selected_room_schedules = this.getOccupiedRooms
        this.room_dialog = true
      },
      async machineSelected(item) {
        this.selected_machine_schedule = item
        await this.fetchOccupiedMachine({data:{id: item.id, token: this.getAccessToken}})
        this.selected_machine_schedules = this.getOccupiedMachine
        this.machine_dialog = true
      },
      patientSelected(item) {
        this.selected_patient = item
        this.first_name = item.first_name
        this.last_name = item.last_name
        this.age = item.age
        this.gender = item.gender
      },
      // TODO: 
      //  Make session date editable in the session table
      //  Add button at the bottom of the session table to clean/finalize session
      async generatedSessions() {
       if (this.selected_patient.id!==undefined && 
          this.selected_procedure !=='' && this.days_interval !=='' && 
          this.session_count !=='' && this.date!==''){
          let payload = {
                    token: this.getAccessToken,
                    data: {
                        patient: this.selected_patient.id,
                        procedure: this.selected_procedure,
                        session_interval: this.days_interval,
                        number_of_session: this.session_count,
                        start_date: this.date
                    }
                }
            await this.createSession(payload)
            this.generated_sessions = this.getAppointmentSessions
            this.clearSessionsFields()
            this.color = 'success'
            this.text =  'Successfully generated'
            this.snackbar = true
            this.isEditing = true
       }
       else { 
            this.clearSessionsFields()
            this.color = 'red darken-1'
            this.text =  'All fields are required!'
            this.snackbar = true
       }
      },
      updateMachineOnSelectedSession (){
        if (Object.entries(this.editedItem).length !== 0){
          let partial = {
              ...this.editedItem
          }
          partial.machine_start_time = this.machine_start_time
          partial.machine_end_time = this.machine_end_time
          partial.machine = this.selected_machine_schedule.name
          Object.assign(this.generated_sessions[this.editedIndex], partial)
          this.editedItem = Object.assign({},partial)
          this.machine_dialog = false
        }
        else { 
            this.color = 'red darken-1'
            this.text =  'No session selected'
            this.snackbar = true
        }
      },
      updateRoomOnSelectedSession() {
        if (Object.entries(this.editedItem).length !== 0){
          let partial = {
              ...this.editedItem
          }
          partial.room_start_time = this.room_start_time
          partial.room_end_time = this.room_end_time
          partial.room = this.selected_room_schedule.room_no
          Object.assign(this.generated_sessions[this.editedIndex], partial)
          this.editedItem = Object.assign({},partial)
          this.room_dialog = false
        }
        else { 
            this.color = 'red darken-1'
            this.text =  'No session selected'
            this.snackbar = true
        }
      },
      async updateSessionDate(item){
        this.date_dialog = false
        this.menu_datepicker_update = false
        let index = this.generated_sessions.indexOf(item)
        let partial = {
          ...item
        }
        partial.date = this.update_date
        await this.updateSession({ data: partial, token: this.getAccessToken})
        Object.assign(this.generated_sessions[index], this.getUpdatedAppointmentSessions)
        this.color = 'success'
        this.text =  'Date updated'
        this.snackbar = true
        this.isEditing = true
      },
      clearSessionsFields() {
        this.selected_patient = {}
        this.first_name = ''
        this.last_name = ''
        this.age = ''
        this.gender = ''
        this.selected_procedure = ''
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
    },
    async created () {
      await this.fetchRooms()
      await this.fetchPatients()
      await this.fetchMachines()
      await this.fetchProcedures()
      this.initializeProcedures()
      this.initializeMachines()
      this.initializePatients()
      this.initializeRooms()
    }
  }
</script>

<style>
  .v-data-table > .v-data-table__wrapper > table > tbody > tr > td, 
  .v-data-table > .v-data-table__wrapper > table > thead > tr > td, 
  .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
   font-size: 13px !important;
  }
  .v-label {
    font-size: 12px !important;
  }
  .v-list-item__title{
    font-size: 12px !important;
  }
  td { 
    padding-left:8px !important;
    padding-right:1px !important;
  }
  .v-select__selections{
    font-size: 12px !important;
  }
  .v-text-field__slot {
    font-size: 12px !important;
  }
  .v-messages__message {
    font-size: 10px !important;
  }
  .error-message {
    font-size: 12px;
  }
</style>