<template>
    <div class="my-2">
      <v-btn @click="logout" small>Normal</v-btn>
    </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
    methods: {
        ...mapActions(['logout'])
    },
    created () {
        this.logout()
        .then(() => {
            this.$router.push({name: "Login"})
        })
    }
}
</script>

<style>

</style>