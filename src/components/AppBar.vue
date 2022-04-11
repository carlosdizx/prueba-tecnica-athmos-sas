<template>
  <v-card color="white">
    <v-app-bar>
      <v-btn text>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs align-with-title color="teal accent-3">
          <v-tab
            v-for="(tab, index) of tabs"
            :key="index"
            @click="item = index + 1"
          >
            <v-chip
              v-if="item === index + 1"
              dark
              color="teal accent-3"
              class="ma-2"
            >
              {{ 1 + index }}
            </v-chip>
            <v-chip
              v-if="item !== index + 1"
              dark
              color="grey lighten-2"
              class="ma-2"
            >
              {{ 1 + index }}
            </v-chip>
            {{ tab.title }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppBar",
  data: () => ({
    item: 1,
    tabs: [
      { title: "Tab 1" },
      { title: "Tab 2" },
      { title: "Tab 3" },
      { title: "Tab 4" },
      { title: "Tab 5" },
      { title: "Tab 6" },
      { title: "Tab 7" },
      { title: "Tab 8" },
      { title: "Tab 9" },
      { title: "Tab 10" },
    ],
  }),
});
</script>

<style scoped></style>
