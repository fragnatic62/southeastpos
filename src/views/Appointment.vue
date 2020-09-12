<template>
  <div class="patients">
    <div v-for="appointment in this.allAppointments.results" :key="appointment.id">
      <p>{{ appointment.date }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  computed: mapGetters(['allAppointments', 'getAccessToken']),
  methods: {
    ...mapActions(['fetchAppointments']),
  },
  created () {
    this.fetchAppointments(this.getAccessToken)
  }
}
</script>

<style>
 .patients {
   left: 25%;
 }
</style>
