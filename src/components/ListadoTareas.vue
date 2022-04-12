<template>
  <v-card>
    <v-data-table
      :headers="columnas"
      :items="filas"
      item-key="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-tooltip color="red" right v-if="seleccionados.length > 0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="eliminar"
              fab
              class="red accent-2 mx-3 mt-2"
              dark
              top
              right
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Eliminar tareas seleccionadas</span>
        </v-tooltip>
        <v-card-text>
          <strong>Pasos inmediatos</strong>
          <br />
          Aqui van los pasos que completaste
          <CrearTarea @registro="agregar($event)" />
          <br />
        </v-card-text>
        <v-divider />
      </template>
      <template v-slot:item.seleccion="{ item }">
        <v-checkbox v-model="seleccionados" :value="item" />
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
    seleccionados: [],
    columnas: [
      { text: "", value: "seleccion", sortable: false },
      { text: "Titulo", value: "titulo" },
      { text: "Descripción", value: "descripcion" },
      { text: "Tags", value: "tags" },
      { text: "Acciones", value: "acciones" },
    ],
    filas: [{}],
  }),
  methods: {
    async agregar(datos: any): Promise<void> {
      this.filas.push(datos);
    },
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
    eliminar(): void {
      this.seleccionados.forEach((seleccionado) => {
        this.filas = this.filas.filter((fila) => fila !== seleccionado);
      });
      this.seleccionados = [];
    },
  },
  created() {
    this.listar();
  },
});
</script>

<style scoped></style>
