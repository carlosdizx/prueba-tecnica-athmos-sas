<template>
  <v-card>
    <v-data-table
      v-model="seleccionados"
      :headers="columnas"
      :items="filas"
      :single-select="singleSelect"
      item-key="name"
      show-select
      class="elevation-1"
    >
      <template v-slot:top>
        <v-card-text>
          <strong>Pasos inmediatos</strong>
          <br />
          Aqui van los pasos que completaste
          <CrearTarea @registro="listar" />
        </v-card-text>
        <v-divider />
        <v-switch
          v-model="singleSelect"
          label="Selección simple"
          class="mx-2 my-1"
        />
      </template>
    </v-data-table>
    {{ seleccionados }}
  </v-card>
</template>

<script lang="ts">
import CrearTarea from "@/components/CrearTarea.vue";
import Vue from "vue";

export default Vue.extend({
  name: "ListadoTareas",
  components: { CrearTarea },
  data: () => ({
    singleSelect: false,
    seleccionados: [],
    columnas: [
      { text: "Titulo", value: "titulo" },
      { text: "Descripción", value: "descripcion" },
      { text: "Tags", value: "tags" },
      { text: "Acciones", value: "acciones" },
    ],
    filas: [{}],
  }),
  methods: {
    async listar(): Promise<void> {
      this.filas = [];
      this.filas.push({
        titulo: "Titulo 1",
        descripcion: "Descripcion 1",
        tags: ["Tag 1", "Tag 2", "Tag 3"],
      });
      this.filas.push({
        titulo: "Titulo 2",
        descripcion: "Descripcion 2",
        tags: ["Tag 1", "Tag 2", "Tag 3"],
      });
      this.filas.push({
        titulo: "Titulo 3",
        descripcion: "Descripción 3",
        tags: ["Tag 1", "Tag 2", "Tag 3"],
      });
    },
  },
  created() {
    this.listar();
  },
});
</script>

<style scoped></style>
