<template>
  <v-app-bar color="white" app>
    <div class="d-flex">
      <v-btn text class="mx-5">
        <v-icon dark>mdi-home</v-icon>
      </v-btn>
      <v-tabs background-color="white" color="teal accent-3" class="mx-5">
        <v-tab class="mx-5">Estate state</v-tab>
        <v-tab class="mx-5">Item Two</v-tab>
        <v-tab class="mx-5">Item Three</v-tab>
        <v-tab class="mx-5">Item Three</v-tab>
        <v-tab class="mx-5">Item Three</v-tab>
        <v-tab class="mx-5">Item Three</v-tab>
      </v-tabs>
    </div>
    <v-spacer></v-spacer>
    <!--Aqui va la info del user-->
    <v-alert dense>
      <h5><b>Carlos Ernesto Díaz Basante</b></h5>
      <small><b>información extra</b></small>
    </v-alert>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppBar",
});
</script>

<style scoped></style>
