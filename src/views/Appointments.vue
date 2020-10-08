<template>
  <v-sheet
    class="main-container"
  >
    <v-tabs
        fixed-tabs
        background-color="success"
        dark
        v-model="tab"
    >
        <v-tab 
          class="appointment-tabs"
          v-for="tab in tab_list"
          :key="tab"
        >
          {{ tab }}
        </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        Test1
      </v-tab-item>
      <v-tab-item>
        <NewAppointment />
      </v-tab-item>
      <v-tab-item>
        Test2
      </v-tab-item>
      <v-tab-item>
        Test3
      </v-tab-item>
    </v-tabs-items>
  </v-sheet>
</template>

<script>
import NewAppointment from "../components/NewAppointment.vue"

export default {
    data () {
        return {
            tab:null,
            tab_list:[
                "On Date","New Appointment",
                "Unassigned Sessions",
                "Reschedule Sessions"
                ]
        }
    },
    components: {
        NewAppointment: NewAppointment
    }
}
</script>

<style scoped>
.main-container {
    height: 727px;
    margin-left: 4px !important;
    margin-right: 4px;
    margin-top: 13px;
}
.appointment-tabs {
    font-size: 11px !important;
}
</style>