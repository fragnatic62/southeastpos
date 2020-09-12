<template>
  <v-app>
    <Navbar v-if="this.authorized===true || this.authorized==='true'" />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>


<script>
import Navigation from './components/Navigation'
import { mapGetters } from "vuex"

export default {
  name: 'App',
  components: {
    Navbar: Navigation
  },
  computed : {
    ...mapGetters(['authorized'])
    }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #e5e5e5;
      }
    }
}
</style>



