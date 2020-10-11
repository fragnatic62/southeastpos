<template>
  <v-sheet
    class="main-container"
    elevation=4
  >
    <v-data-table
      :headers="headers"
      :items="assigned_appointments"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-spacer></v-spacer>
          <v-toolbar-title>
              On-Date Sessions
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
       <v-btn
        class="ma-2"
        color="success"
        small
        @click="serveAppointment(item)"
      >
        Serve
      </v-btn>
      </template>
    </v-data-table>
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

  export default {
    data: () => ({
      headers: [
        {
          text: 'Patient Name',
          align: 'start',
          sortable: false,
          value: 'client_info.client_name',
        },
        { text: 'Procedure', value: 'procedure_name' },
        { text: 'Appointment now', value: 'date' },
        { text: 'Machine', value: 'machine_name' },
        { text: 'Machine Start Time', value: 'machine_start_time' },
        { text: 'Machine End Time', value: 'machine_end_time' },
        { text: 'Room', value: 'room_name' },
        { text: 'Room Start Time', value: 'room_start_time' },
        { text: 'Room End Time', value: 'room_end_time' },
        { text: 'Actions', value: 'actions', sortable: false, align:'center' },
      ],
      assigned_appointments: [],
    }),
    computed: {
      ...mapGetters(['allOnDateAppointments']),
    },
    async created () {
      await this.fetchOnDateAppointments()
      this.initialize()
    },
    methods: {
      ...mapActions(['fetchOnDateAppointments']),
      initialize () {
        this.assigned_appointments = this.allOnDateAppointments
      },
      serveAppointment(item) {
        console.log(item)
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