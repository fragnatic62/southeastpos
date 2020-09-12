<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        class="ma-2"
        outlined
        small
        fab 
        color="purple"
        v-bind="attrs"
        v-on="on"
        >
         <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="#1F7087">
          <v-toolbar-title>Patient Record</v-toolbar-title>

          <v-divider></v-divider>

          <v-toolbar-items>
            <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-row class="ml-0 mr-0">
            <v-col class="pr-0 pl-0">
                <PatientHistoryDetails />
            </v-col>
            <v-col>
                <PatientHistoryDetails />
            </v-col>
            <v-col>
                <PatientHistoryDetails />
            </v-col>
        </v-row>
        <PatientHistorySlider />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import PatientHistoryDetails from "../cards/PatientHistoryDetails"
import PatientHistorySlider from "../Sliders/PatientHistorySlider"

  export default {
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        model: null,
      }
    },
    components: {
        PatientHistoryDetails: PatientHistoryDetails,
        PatientHistorySlider: PatientHistorySlider
    }
  }
</script>
