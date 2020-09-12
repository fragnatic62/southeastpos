<template>
  <v-container class="room-container pa-4">
  <v-row dense>
  <v-col
  v-for="procedure in this.allProcedures.results"
  :key="procedure.id"
  cols="3"
  >
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://media.allure.com/photos/5c2e8ec54325fe2d62c0943a/16:9/w_2560%2Cc_limit/how-often-should-you-get-a-facial-lede.jpg"
    >
      <v-card-title>{{ procedure.name }}</v-card-title>
    </v-img>

    <v-card-text class="text--primary">
      <v-chip>Price:{{ procedure.price }}</v-chip>
      <div class="text-description">{{ procedure.description }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        small
        color="primary"
      >
        Update
      </v-btn>

      <v-btn
        small 
        color="error"
      >
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-col>
  </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  computed: mapGetters(['allProcedures', 'getAccessToken']),
  methods: {
    ...mapActions(['fetchProcedures']),
  },
  created () {
    this.fetchProcedures(this.getAccessToken)
  }
}
</script>

<style>
 .text-description {
   text-align: left;
 }
</style>
