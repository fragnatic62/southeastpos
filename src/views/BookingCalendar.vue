<template>

  <v-row class="booking-calendar">
      <v-col cols="2">
      </v-col>
      <v-col>
      <v-row>
        <v-col class="pr-0">
          <v-sheet height="100" class="pt-2" color="#EFEFF9">
            <v-row>
              <strong class="pl-10 pt-7">Schedule</strong>
            </v-row>
            <v-row>
            <span class="pl-10">Schedule for choosen month</span>
            </v-row>
          </v-sheet>
        </v-col>
        <v-col class="pl-0 pr-0">
        <v-sheet height="100" class="pt-2" color="#F3F4F8">
        </v-sheet>
        </v-col>
        <v-col class="pl-0 pr-8">
        <v-sheet height="100" class="pt-2" color="#F3F4F8">
          <v-toolbar class="pt-4 ml-15 pl-15" color="#F3F4F8" elevation="0">
            <v-btn outlined tile  color="grey darken-2" to="/patients">
                <v-icon left>mdi-calendar-month-outline</v-icon>
                Patients
            </v-btn>
            <v-btn outlined tile color="grey darken-2"  to="/booking">
              <v-icon left>mdi-format-list-bulleted-square</v-icon>
                Booking
            </v-btn>
            <v-btn outlined tile  color="grey darken-2" to="/bookingcalendar">
                <v-icon left>mdi-calendar-month-outline</v-icon>
                Calendar
            </v-btn>
          </v-toolbar>
        </v-sheet>
        </v-col>
      </v-row>
      <v-row>
      <v-sheet height="64">
        <v-toolbar flat color="white">
            <v-col cols="12">
                <v-row>
                <v-btn fab outlined tile text small color="grey darken-2" @click="prev">
                    <v-icon small>mdi-chevron-left</v-icon>
                </v-btn>
                    <v-alert
                    class="mt-0"
                    dense
                    v-if="$refs.calendar"
                >
                    <h5>{{ `${$refs.calendar.title.substring(0, 3)} ${$refs.calendar.title.slice(-4)}` }}</h5>
                    </v-alert>
                <v-btn fab text outlined tile small color="grey darken-2" @click="next">
                    <v-icon small>mdi-chevron-right</v-icon>
                </v-btn>
                </v-row>
            </v-col>
            <v-col cols="12">
            </v-col>
            <v-col cols="12">
            </v-col>
            <v-col cols="12">
                <v-menu bottom right>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        class="pl-5"
                        outlined
                        color="grey darken-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <span>{{ typeToLabel[type] }}</span>
                        <v-icon right>mdi-menu-down</v-icon>
                    </v-btn>
                    </template>
                    <v-list>
                    <v-list-item @click="type = 'day'">
                        <v-list-item-title>Day</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'week'">
                        <v-list-item-title>Week</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'month'">
                        <v-list-item-title>Month</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = '4day'">
                        <v-list-item-title>4 days</v-list-item-title>
                    </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
        </v-toolbar>
      </v-sheet>
      </v-row>
      <v-row>
      <v-sheet height="500" class="calendar-sheet pl-4">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: !allDay,
          })
        }

        this.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>

<style>
  .calendar-sheet {
    width: 1390px !important;
  }
</style>