<template>
  <div class="home">
    <AppBar />
    <v-container class="mt-2">
      <ListadoTareas />
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppBar from "@/components/AppBar.vue";
import ListadoTareas from "@/components/ListadoTareas.vue";

export default Vue.extend({
  name: "HomeView",
  components: {
    AppBar,
    ListadoTareas,
  },
});
</script>
