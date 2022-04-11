<template>
  <v-card color="white">
    <v-app-bar absolute>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-icon>mdi-home</v-icon>
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab v-for="(tab, index) of tabs" :key="index">
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
