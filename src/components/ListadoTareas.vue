<template>
  <v-card>
    <v-card-title><strong>Pasos inmediatos</strong></v-card-title>
    <v-card-text>
      Aqui van los pasos que completaste
      <CrearTarea @registro="listar" />
    </v-card-text>
    <v-divider />
    <v-card-text>
      <h1>... Aquí van las tareas</h1>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import CrearTarea from "@/components/CrearTarea.vue";
import Vue from "vue";

export default Vue.extend({
  name: "ListadoTareas",
  components: { CrearTarea },
  methods: {
    listar(): void {
      console.log("Listado");
    },
  },
});
</script>

<style scoped></style>
