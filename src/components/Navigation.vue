<template>
  <v-container  class="pt-0 pr-0 pl-0 pb-0 ml-0 mr-0 mt-0">
        <v-toolbar class="nav-bar">
          <v-spacer></v-spacer>
          <v-toolbar-items              
            v-for="item in items"
            :key="item.title"
          >
            <v-btn
              :to="item.to"
              text
              rounded
            >{{ item.title }}
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Appointments', icon: 'mdi-account-heart', to: "/" },
          { title: 'Patients', icon: 'mdi-account-heart', to: "/patients" },
          { title: 'Rooms', icon: 'mdi-home-circle-outline', to: "/room" },
          { title: 'Machines', icon: 'mdi-state-machine', to: "/machine" },
          { title: 'Procedures', icon: 'mdi-account-heart', to: "/procedure" },
          { title: 'About', icon: 'mdi-help-box', to: "/about" },
          { title: 'Logout', icon: 'mdi-logout', to: "/logout" },
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
  .v-btn {
  text-transform:none !important;
  }
  .nav-bar .v-btn__content {
    color:rgb(23, 151, 30) !important;
  }
</style>