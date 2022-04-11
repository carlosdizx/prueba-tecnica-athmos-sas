<template>
  <v-card>
    <v-card-title><strong>Pasos inmediatos</strong></v-card-title>
    <v-card-text>
      Aqui van los pasos que completaste
      <v-btn class="float-right success" text>
        <v-icon>mdi-plus</v-icon> Agregar tarea
      </v-btn>
    </v-card-text>
    <v-divider />
    <v-card-text>
      <h1>... Aquí van las tareas</h1>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ListadoTareas",
});
</script>

<style scoped></style>
