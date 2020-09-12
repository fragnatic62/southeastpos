<template>
  <div class="bread-crumbs">
    <v-breadcrumbs :items="items"></v-breadcrumbs>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  data () {
    return {
      items: [
        {
          text: 'Bookings',
          disabled: false,
          href: '/bookingcalendar',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: '/',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: '/',
        }
      ]

    }
  },
  computed: mapGetters(['allMachines', 'getAccessToken']),
  methods: {
    ...mapActions(['fetchMachines']),
  },
  created () {
    this.fetchMachines(this.getAccessToken)
  }
}
</script>

<style>
 .patients {
   left: 25%;
 }
 .bread-crumbs {
   margin-left: 250px !important;
 }
</style>

