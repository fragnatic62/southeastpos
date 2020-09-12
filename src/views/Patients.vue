<template>

  <v-row class="booking-calendar">
      <v-col cols="2">
      </v-col>
      <v-col>
      <v-row>
        <v-col class="pr-0">
          <v-sheet height="100" class="pt-2" color="#EFEFF9">
            <v-row>
              <strong class="pl-10 pt-7">Patients</strong>
            </v-row>
            <v-row>
            <span class="pl-10">Select patient to create sessions</span>
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
          <div class="patient-container">
            <div class="column-headers">
            <v-row>
              <v-col cols="1" class="ml-10">
                </v-btn>
              </v-col>
              <v-col cols="1">
                <v-btn text color="grey">
                  CLIENT INFORMATION
                </v-btn>
              </v-col>
              <v-col cols="1" class="ml-15 pl-15">
                <v-btn text color="grey">
                  Age
                </v-btn>
              </v-col>
              <v-col cols="2" class="ml-15">
                <v-btn text color="grey">
                  Gender
                </v-btn>
              </v-col>
              <v-col cols="1" class="ml-0">
                <v-btn text color="grey">
                  Address
                </v-btn>
              </v-col>
              <v-col cols="1" class="ml-15 pl-15">
                <v-btn text color="grey">
                  Actions
                </v-btn>
              </v-col>
              <v-col class="pl-15 ml-15 pr-0" cols="2">
                <v-text-field
                    placeholder="search"
                    filled
                    rounded
                    dense
                    append-icon="mdi-magnify"
                    class="shrink"
                  ></v-text-field>
              </v-col>
            </v-row>
            </div>
              <v-spacer></v-spacer>
              <v-row>
                <v-col></v-col>
                <v-col
                  v-for="item in allPatients.results"
                  :key="item.id"
                  cols="12"
                  class="client-container-card"
                >
                  <v-card
                    color="white"
                    dark
                    max-width="1350"
                    class="pl-4"
                    height="85"
                  >
                    <div>
                      <v-row>
                        <v-col cols="1">
                          <v-avatar color="#1F7087" size="62">
                            <span class="white--text headline">{{ getinitial(item.first_name, item.last_name) }}</span>
                          </v-avatar>
                        </v-col>

                        <v-col cols="2" class="pl-13 ml-7 pr-0">
                          <v-row>
                              <span class="black--text">{{ `${item.first_name} ${item.middle_name} ${item.last_name}` }}</span>
                          </v-row>
                          <v-row>
                              <span class="grey--text">{{ item.contact_no }}</span>
                          </v-row>
                          <v-row>
                              <span class="grey--text">{{ item.occupation }}</span>
                          </v-row>
                        </v-col>

                        <v-col cols="1" class="ml-2 pt-6 pl-9 pr-0">
                          <v-row>
                            <v-chip color="orange" v-if="item.age !== null">
                              {{ item.age }}
                            </v-chip>
                          </v-row>
                        </v-col>
                        

                        <v-col cols="1" class="ml-15 pl-15 pt-6 pr-0 mr-0">
                          <v-row>
                            <v-chip color="teal">
                              {{ item.gender }}
                            </v-chip>
                          </v-row>
                        </v-col>

                        <v-col cols="2" class="ml-15 pl-15 pt-6 pr-0 mr-0">
                          <v-row>
                              <span class="black--text text-sm-left">{{ item.address }}</span>
                          </v-row>
                        </v-col>

                        <v-col cols="2" class="pt-3 pl-10 pr-0 pt-0">
                          <v-row>
                            <v-tooltip bottom>
                              <PatientHistoryModal />
                              <span>Show History</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  class="pagination-button ma-2"
                                  outlined
                                  small
                                  fab 
                                  color="green"
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="newSession(item)"
                                >
                                <v-icon>mdi-plus-circle</v-icon>
                                </v-btn>
                              </template>
                              <span>New Session</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  class="ma-2"
                                  outlined
                                  small
                                  fab 
                                  color="red"
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="deactivateUser(item)"
                                >
                                <v-icon>mdi-close-circle</v-icon>
                                </v-btn>
                              </template>
                              <span>Deactivate</span>
                            </v-tooltip>
                            <PatientHistoryModal />
                          </v-row>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
              <div class="footer">
                <v-row>
                  <v-col col="1">
                    <span v-if="allPatients.previous === null"><strong>No previous </strong></span>
                  </v-col>
                  <v-col cols="2" class="pl-10 pb-3 pt-3">
                      <v-btn class="mx-2" fab dark color="indigo" @click="nextPage(allPatients.previous)">
                        <v-icon dark>mdi-skip-previous</v-icon>
                      </v-btn>
                      <v-btn class="mx-2" fab dark color="indigo" @click="nextPage(allPatients.next)">
                        <v-icon dark>mdi-skip-next</v-icon>
                      </v-btn>
                  </v-col>
                  <v-col>
                    <span v-if="allPatients.next === null"><strong>Nothing follows</strong></span>
                  </v-col>
                </v-row>
              </div>
          </div>
        </v-sheet>

      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import PatientHistoryModal from "../components/Modals/PatientHistoryModal"

  export default {
    data () {
      return {
        checkbox1: true,
        checkbox2: false,
        checkbox3: false
      }
    },
     computed: {
       ...mapGetters(['allPatients', 'getAccessToken'])
    },
     methods: {
       ...mapActions(['fetchPatients']),
      getinitial (first_name, last_name){
          try {
            let full_name = `${first_name} ${last_name}`
            let matches = full_name.match(/\b(\w)/g);
            let acronym = matches.join('');
            return acronym
              
          } catch (error) {
              return 'NA'
          }
      },
      async nextPage (next) {
        if(next!== null){
          await this.fetchPatients({token: this.getAccessToken,nextpage:next})
        }
      },
      viewHistory(item) {
        console.log(item, "view history")
      },
      newSession(item){
        console.log(this.allPatients.results)
          console.log(item)
      },
      deactivateUser(item){
          console.log(item)
      }
    },
    components:{
        PatientHistoryModal: PatientHistoryModal
    },
    async created () {
      await this.fetchPatients({token: this.getAccessToken,nextpage:null})
    },
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
  .client-container-card {
        margin-left: 15px !important;
        margin-top: 0px !important;
        padding-top: 10px !important;
        padding-bottom: 0px !important;
    }
    .patients-container {
      margin-left: 60px !important;
    }
    .column-headers {
      margin-left: 40px !important;
      height: 30px;
    }
    .pagination-button{
      margin-left: 200px !important;
    }
    .footer {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      color: black;
      text-align: center;
      margin-left: 150px;
}
</style>