<template>
  <v-container  class="pt-0 pr-0 pl-0 pb-0 ml-0 mr-0 mt-0">
      <v-row>
          <v-navigation-drawer
          v-model="drawer"
          :color="color"
          :expand-on-hover="expandOnHover"
          :mini-variant="miniVariant"
          :right="right"
          :permanent="permanent"
          :src="bg"
          absolute
          dark
          height="740"
        >
          <v-list
            dense
            nav
            class="py-0"
          >
            <v-list-item two-line :class="miniVariant && 'px-0'">
              <v-list-item-content>
                <strong class="nav-text">SOUTHEAST CLINIC</strong>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.to"
            >
              <v-list-item-icon>
                <v-icon color="blue-grey darken-2">{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="nav-text" align="left"><strong>{{ item.title }}</strong></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'APPOINTMENTS', icon: 'mdi-calendar-clock', to: "/appointments" },
          { title: 'PATIENTS', icon: 'mdi-account-heart', to: "/patients" },
          { title: 'ROOMS', icon: 'mdi-home-circle-outline', to: "/room" },
          { title: 'MACHINES', icon: 'mdi-state-machine', to: "/machine" },
          { title: 'PROCEDURES', icon: 'mdi-account-heart', to: "/procedure" },
          { title: 'ABOUT', icon: 'mdi-help-box', to: "/about" },
          { title: 'LOGOUT', icon: 'mdi-logout', to: "/logout" },
        ],
        color: '#FFEFB8',
        right: false,
        permanent: true,
        miniVariant: false,
        expandOnHover: false,
        background: false,
      }
    },
    computed: {
      bg () {
        return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
      },
    },
  }
</script>

<style>
  .container {
    max-width: 1687px !important;
  }
  .nav-text {
    color: #333333;
  }
</style>