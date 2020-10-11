<template>
  <v-sheet
    class="main-container"
    elevation=4
  >
    <v-data-table
      :headers="headers"
      :items="unassigned_appointments"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-spacer></v-spacer>
          <v-toolbar-title>
              Assign Room/Machine to sessions
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <ScheduleModal @onSaved="updateTable"  v-bind:session="editedSession" v-bind:index="selected_index" ref="ScheduleModal"/>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
       <v-btn
        class="ma-2"
        color="success"
        small
        @click="updateRoomSchedule(item)"
      >
        Set Schedule
      </v-btn>
      </template>
    </v-data-table>
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import ScheduleModal from "./modals/ScheduleModal.vue"

  export default {
    data: () => ({
      selected_index: null,
      editedSession: null,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Patient Name',
          align: 'start',
          sortable: false,
          value: 'client_info.client_name',
        },
        { text: 'Procedure', value: 'procedure_name' },
        { text: 'Tentative Appointment Date', value: 'date' },
        { text: 'Machine', value: 'machine_name' },
        { text: 'Machine Start Time', value: 'machine_start_time' },
        { text: 'Machine End Time', value: 'machine_end_time' },
        { text: 'Room', value: 'room_name' },
        { text: 'Room Start Time', value: 'room_start_time' },
        { text: 'Room End Time', value: 'room_end_time' },
        { text: 'Actions', value: 'actions', sortable: false, align:'center' },
      ],
      unassigned_appointments: [],
    }),
    components: {
      ScheduleModal: ScheduleModal,

    },
    computed: {
      ...mapGetters(['allUnassignedAppointments']),
    },
    async created () {
      await this.fetchUnassignedAppointments()
      this.initialize()
    },
    methods: {
      ...mapActions(['fetchUnassignedAppointments']),
      initialize () {
        this.unassigned_appointments = this.allUnassignedAppointments
      },
      updateRoomSchedule (item) {
        this.editedSession=item
        this.selected_index = this.unassigned_appointments.indexOf(item)
        this.$refs.ScheduleModal.open()
      },
      updateMachineSchedule (item) {
        this.editedSession=item
        this.$refs.RoomModal.open()
      },
      updateTable (item, index) {
        Object.assign(this.unassigned_appointments[index], item)
        console.log(item,"pass back")
      }
    },
  }
</script>

<style scoped>
.main-container {
  height: 655px !important;
  margin-left: 4px !important;
  margin-right: 4px;
  margin-top: 13px;
}
</style>