<template>
  <v-dialog
    v-model="dialog"
    max-width="75%"
    class="ma-0"
  >
    <v-card width="100%">
      <v-toolbar flat width="100%">
        <span> <strong>Create Machine Schedule</strong> </span>
        <v-spacer></v-spacer>
        <v-btn
          medium
          @click="dialog = false"
        >
          close
        </v-btn>
      </v-toolbar>
      <v-card elevation="0" height="20%" width="98%">
        <v-row width="100%" class="top-row-pane ml-">
          <v-col class="pt-0" cols="4">
            <v-card width="100%" height="200" elevation="2">
              <v-row class="ml-1">
                <v-chip
                  class="ma-2"
                  color="success"
                  label
                >
                  Patient name: {{ session_info.client_info.client_name }}
                </v-chip>
              </v-row>
              <v-row class="ml-1">
                <v-chip
                  class="ma-2"
                  color="success"
                  label
                >
                  Age: {{ session_info.client_info.age }}
                </v-chip>
                <v-chip
                  class="ma-2"
                  color="success"
                  label
                >
                  Gender: {{ session_info.client_info.gender }}
                </v-chip>
              </v-row>
              <v-row class="ml-1">
                <v-chip
                  class="ma-2"
                  color="success"
                  label
                >
                  Procedure: {{ session_info.procedure_name }}
                </v-chip>
              </v-row>
              <v-row class="ml-1">
                <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                >
                  1-6
                </v-chip>
              </v-row>
            </v-card>
          </v-col>
          <v-col class="pb-0 pt-0"cols="8">
            <v-card height="200" elevation="2">
              <v-col class="pb-0" cols="12">
                <v-row>
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
                        class="date-text-field"
                        v-model="selected_date"
                        label="Scheduled Date"
                        hint="MM/DD/YYYY"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        @blur="date = parseDate(selected_date)"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      no-title
                      @input="session_start_date_menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-row>
              </v-col>
              <v-col class="pt-0 pb-0" cols="12">
                <v-row>
                  <v-col class="pt-0 pb-0" cols="4">
                    <v-select
                      class="ml-5 pb-0 pt-0"
                      v-model="selected_machine_session"
                      :items="machines"
                      item-value="id"
                      item-text= "name"
                      label="Machine"
                    ></v-select>
                  </v-col>
                  <v-col class="pl-1 pt-0 pb-0" cols="4">
                    <v-select
                      class="pb-0 pt-0"
                      v-model="machine_start_time"
                      :items="time_list"
                      label="Start time"
                      prepend-icon="mdi-clock-in"
                    ></v-select>
                  </v-col>
                  <v-col class="pl-1 pt-0 pb-0" cols="4">
                    <v-select
                      class="pb-0 pt-0"
                      v-model="machine_end_time"
                      :items="time_list"
                      label="End time"
                      prepend-icon="mdi-clock-out"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
               <v-col class="pt-0 pb-0" cols="12">
                <v-row>
                  <v-col class="ml-0 pl-8 pt-0 pb-0 mr-0 pr-0"cols="4">
                    <v-select
                      v-model="selected_room_session"
                      :items="rooms"
                      item-value="id"
                      item-text= "room_no"
                      label="Rooms"
                    ></v-select>
                  </v-col>
                  <v-col class="pl-1 pt-0 pb-0"cols="4">
                    <v-select
                      class="mr-0"
                      v-model="room_start_time"
                      :items="time_list"
                      label="Start time"
                      prepend-icon="mdi-clock-in"
                    ></v-select>
                  </v-col>
                  <v-col class="pl-1 pb-0 pt-0 ma-0"cols="4">
                    <v-select
                      v-model="room_end_time"
                      :items="time_list"
                      label="End time"
                      prepend-icon="mdi-clock-out"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-card>
          </v-col>
          <v-col cols="1">
          </v-col>
        </v-row>
        <v-row width="100%">
          <v-col class="ma-0 pa-0" cols="9">
          </v-col>
          <v-col cols="1">
            <v-btn
              medium
              @click="save"
            >
              Save
            </v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn
              medium
              @click="clearFields"
            >
              Clear
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <v-toolbar>
        <v-col cols="6">
          <span><strong>Machine Unavailability</strong></span>
        </v-col>
        <v-col cols="6">
          <span><strong>Room Unavailability</strong></span>
        </v-col>
      </v-toolbar>
      <v-row class="row-container">
        <v-col class="pa-0 ml-10 mt-6 mr-2 mb-6" cols="1">
          <v-data-table
              :headers="machine_headers"
              :items="machines"
              sort-by="calories"
              class="name"
              :hide-default-footer="true"
            >
            <template v-slot:item.name="{ item }">
              <v-btn
                x-small
                text
                @click="machineSelected(item)"
              >
                <strong>{{ item.name }}</strong>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
        <v-col class="pa-0 ml-0 mt-6 mr-0 mb-6" cols="4">
          <v-data-table
              :headers="machine_schedules_headers"
              :items="machine_schedules"
              sort-by="date"
              class="elevation-1"
              :hide-default-footer="true"
            >
          </v-data-table>
        </v-col>
        <v-col cols="1"></v-col>
        <!--- --->
         <v-col class="pa-0 ml-6 mt-6 mr-0 mb-6" cols="1">
          <v-data-table
              :headers="room_headers"
              :items="rooms"
              sort-by="room_no"
              class="elevation-1"
              :hide-default-footer="true"
            >
            <template v-slot:item.room_no="{ item }">
              <v-btn
                x-small
                text
                @click="roomSelected(item)"
              >
                <strong>{{ item.room_no }}</strong>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
        <v-col class="pa-0 ml-2 mt-6 mr-0 mb-6" cols="4">
          <v-data-table
              :headers="room_schedules_headers"
              :items="room_schedules"
              sort-by="date"
              class="elevation-1"
              :hide-default-footer="true"
            >
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
          selected_machine_session:'',
          selected_room_session:'',
          session_info: {},
          patient_info: {},
          session_start_date_menu: false,
          selected_date:'',
          machine_start_time:'',
          machine_end_time:'',
          room_start_time:'',
          room_end_time:'',
          selected_machine_name:"No machine selected",
          date: new Date().toISOString().substr(0, 10),
          machine_schedules:[],
          room_schedules:[],
          machines: [],
          rooms: [],
          selected_machine_schedule:{},
          machine_headers: [
            {
              text: 'Machine',
              align: 'start',
              sortable: false,
              value: 'name',
            }
          ],
          room_headers: [
            {
              text: 'Rooms',
              align: 'start',
              sortable: false,
              value: 'room_no',
            }
          ],
          machine_schedules_headers:[
            {
              text: 'Date',
              align: 'start',
              sortable: false,
              value: 'date',
            },
            { text: 'Start Time', value: 'machine_start_time' },
            { text: 'End Time', value: 'machine_end_time' },
          ],
          room_schedules_headers:[
            {
              text: 'Date',
              align: 'start',
              sortable: false,
              value: 'date',
            },
            { text: 'Start Time', value: 'machine_start_time' },
            { text: 'End Time', value: 'machine_end_time' },
          ],
          time_list:[
            '7:00 AM','7:30 AM', '8:00 AM','8:30 AM', '9:00 AM',
            '9:30 AM', '10:00 AM','10:30 AM', '11:00 AM','11:30 AM',
            '12:00 NOON','12:30 NOON','1:00 PM','1:30 PM','2:00 PM', 
            '2:30 PM', '3:00 PM','3:30 PM', '4:00 PM','4:30 PM',
            '5:00 PM', '5:30 PM', '6:00 PM'
          ],
      }
    },
    props:['session','index'],
    computed: {
      ...mapGetters([
        'getOccupiedMachine',
        'getOccupiedRooms',
        'allMachines',
        'allRooms',
        'getAccessToken',
        'getUpdatedAppointmentSessions']),
    },
    methods: {
      ...mapActions([
        'fetchOccupiedMachine',
        'fetchOccupiedRooms',
        'fetchMachines', 
        'updateSession',
        'fetchRooms']),
      initialize () {
        this.machines = this.allMachines
        this.rooms = this.allRooms
      },
      open() {
          this.dialog = true
      },
      close () {
          this.dialog = false
      },
      async machineSelected(item) {
        this.selected_machine_name = item.name
        this.selected_machine_schedule = { 
          ...item
          }
        await this.fetchOccupiedMachine({data:{id: item.id, token: this.getAccessToken}})
        this.machine_schedules = this.getOccupiedMachine
      },
      async roomSelected(item) {
        this.selected_machine_name = item.name
        this.selected_machine_schedule = { 
          ...item
          }
        await this.fetchOccupiedRooms({data:{id: item.id}, token: this.getAccessToken})
        this.room_schedules = this.getOccupiedRooms
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      async save() {
        let partial = {
          id: this.session_info.id,
          machine_start_time: this.machine_start_time.substr(0,5),
          machine_end_time: this.machine_end_time.substr(0,5),
          machine: this.selected_machine_session,
          room: this.selected_room_session,
          room_start_time: this.room_start_time.substr(0,5),
          room_end_time: this.room_end_time.substr(0,5),
          date: this.date
        }
        await this.updateSession({ data: partial, token: this.getAccessToken})
        this.$emit("onSaved",this.getUpdatedAppointmentSessions,this.index)
        this.dialog = false
      },
      clearFields(){
        this.machine_start_time = ''
        this.machine_end_time = ''
        this.selected_machine_session = ''
        this.selected_room_session = ''
        this.room_start_time= ''
        this.room_end_time = ''
        this.dialog = false
      },
    },

    watch:{
      async session(val){
        this.session_info = {
          ...val
        }
        await this.fetchMachines()
        await this.fetchRooms()
        this.initialize()
      },
      date (val) {
        this.selected_date = this.formatDate(this.date)
      },
    },
  }
</script>

<style scoped>
  .row-container {
    max-width:100%;
  }
  .date-text-field{
    padding-top: 0px;
    margin-top: 0px;
  }
  .top-row-pane{
    height: 200px;
  }
</style>