<template>
  <v-dialog
    v-model="dialog"
    max-width="250px"
  >
    <v-card width="100%">
      <v-data-table
          :headers="machine_headers"
          :items="machines"
          sort-by="calories"
          class="elevation-1"
          :hide-default-footer="true"
        >
        <template v-slot:item.actions="{ item }">
          <v-btn
            x-small
            color="success"
            class="ma-0 pa-2"
            dark
            @click=""
          >
            Select Date/Time
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

  export default {
    data () {
      return { 
          dialog: false,
          occupied_machines: [],
          machines: [],
          machine_headers: [
            {
              text: 'Machine',
              align: 'start',
              sortable: false,
              value: 'name',
            },
            { text: 'Actions', value: 'actions' },
          ],
      }
    },
    props:['session'],
    computed: {
      ...mapGetters([
        'getOccupiedMachine', 
        'allMachines']),
    },
    methods: {
      ...mapActions([
        'fetchOccupiedMachine',
        'fetchMachines', 
        'updateSession']),
      initialize () {
        this.machines = this.allMachines
      },
      open() {
          this.dialog = true
      },
      close () {
          this.dialog = false
      }
    },

    watch:{
      async session(val){
        await this.fetchMachines()
        this.initialize()
      }
    },

    async created () {

    }
  }
</script>

<style scoped>

</style>