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
              Assign Room and Machine
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <MachineScheduleModal  v-bind:session="editedSession" ref="MachineModal"/>
          <RoomScheduleModal v-bind:session="editedSession" ref="RoomModal"/>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
       <v-btn
        class="ma-2"
        color="success"
        small
        @click="updateRoomSchedule(item)"
      >
        Machine Schedule
      </v-btn>
      <v-btn
        class="ma-2"
        color="success"
        small
        @click="updateMachineSchedule(item)"
      >
        Room Schedule
      </v-btn>
      </template>
    </v-data-table>
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import MachineScheduleModal from "./modals/MachineScheduleModal.vue"
import RoomScheduleModal from "./modals/RoomScheduleModal.vue"

  export default {
    data: () => ({
      editedSession: null,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Patient Name',
          align: 'start',
          sortable: false,
          value: 'client_name',
        },
        { text: 'Machine', value: 'machine' },
        { text: 'Machine Start Time', value: 'machine_start_time' },
        { text: 'Machine End Time', value: 'machine_end_time' },
        { text: 'Room', value: 'room' },
        { text: 'Room Start Time', value: 'room_start_time' },
        { text: 'Room End Time', value: 'room_end_time' },
        { text: 'Actions', value: 'actions', sortable: false, align:'center' },
      ],
      unassigned_appointments: [],
    }),
    components: {
      RoomScheduleModal: RoomScheduleModal,
      MachineScheduleModal: MachineScheduleModal,

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
        this.$refs.MachineModal.open()
      },
      updateMachineSchedule (item) {
        this.editedSession=item
        this.$refs.RoomModal.open()
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