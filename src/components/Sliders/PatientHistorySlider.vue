<template>
  <div>
    <v-sheet
      class="mx-auto"
      elevation="8"
      max-width="1600"
    >
      <v-slide-group
        v-model="model"
        class="pa-4"
        :prev-icon="prevIcon ? 'mdi-minus' : undefined"
        :next-icon="nextIcon ? 'mdi-plus' : undefined"
        :multiple="multiple"
        :mandatory="mandatory"
        :show-arrows="showArrows"
        :center-active="centerActive"
      >
        <v-slide-item
          v-for="n in 10"
          :key="n"
          v-slot:default="{ active, toggle }"
        >
          <v-card
            :color="active ? 'primary' : 'grey lighten-1'"
            class="ma-4"
            height="200"
            width="200"
            @click="toggle"
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <v-scale-transition>
                <v-icon
                  v-if="active"
                  color="white"
                  size="48"
                  v-text="'mdi-close-circle-outline'"
                ></v-icon>
              </v-scale-transition>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
  export default {
    data: () => ({
      model: null,
      multiple: false,
      mandatory: false,
      showArrows: true,
      prevIcon: false,
      nextIcon: false,
      centerActive: false,
    }),
  }
</script>