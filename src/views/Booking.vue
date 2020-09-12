<template>

  <v-row class="booking-calendar">
      <v-col cols="2">
      </v-col>
      <v-col>
      <v-row>
        <v-col class="pr-0">
          <v-sheet height="100" class="pt-2" color="#EFEFF9">
            <v-row>
              <strong class="pl-10 pt-7">Bookings</strong>
            </v-row>
            <v-row>
            <span class="pl-10">New booking</span>
            </v-row>
          </v-sheet>
        </v-col>
        <v-col class="pl-0 pr-0">
        <v-sheet height="100" class="pt-4" color="#F3F4F8">
        </v-sheet>
        </v-col>
        <v-col class="pl-0 pr-8">
        <v-sheet height="100" class="pt-2" color="#F3F4F8">
          <v-toolbar class="pt-4 ml-15 pl-15" color="#F3F4F8" elevation="0">
            <v-btn outlined tile  color="grey darken-2"  to="/patients">
                <v-icon left>mdi-calendar-month-outline</v-icon>
                Patients
            </v-btn>
            <v-btn outlined tile color="grey darken-2" to="/booking">
              <v-icon left>mdi-format-list-bulleted-square</v-icon>
                Booking
            </v-btn>
            <v-btn outlined tile  color="grey darken-2"  to="/bookingcalendar">
                <v-icon left>mdi-calendar-month-outline</v-icon>
                Calendar
            </v-btn>

          </v-toolbar>
        </v-sheet>
        </v-col>
      </v-row>

      <v-row>
        <v-sheet class="booking-list rounded-lg ml-3" color="#F6F6FA">
        </v-sheet>

      </v-row>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        checkbox1: true,
        checkbox2: false,
        checkbox3: false
      }
    },
     computed: {

    },
     methods: {
    }
  }
</script>

<style>
  .calendar-sheet {
    width: 1390px !important;
  }
  .booking-form{
    width: 677px;
    height:270px;
  }
  .booking-list {
    width: 1380px;
    height:600px;
  }
</style>