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
          <CrearEditarTarea @registro="agregar($event)" />
          <br />
        </v-card-text>
        <v-divider />
      </template>
      <template v-slot:item.seleccion="{ item }">
        <v-checkbox v-model="seleccionados" :value="item" />
      </template>
      <template v-slot:item.acciones="{ item }">
        <CrearEditarTarea editar :datos="item" @edicion="editar($event)" />
      </template>
    </v-data-table>
    {{ seleccionados }}
  </v-card>
</template>

<script lang="ts">
import CrearEditarTarea from "@/components/CrearEditarTarea.vue";
import Vue from "vue";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortid = require("shortid");

export default Vue.extend({
  name: "ListadoTareas",
  components: { CrearEditarTarea },
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
    async agregar(tarea: any): Promise<void> {
      tarea.id = shortid.generate();
      this.filas.push(tarea);
    },
    async listar(): Promise<void> {
      this.filas = [];
    },
    eliminar(): void {
      this.seleccionados.forEach((seleccionado) => {
        this.filas = this.filas.filter((fila) => fila !== seleccionado);
      });
      this.seleccionados = [];
      this.listar();
    },
    editar(tarea: any): void {
      this.filas.map((fila: any) => {
        if (fila.id === tarea.id) {
          console.log("xd");
          fila.titulo = tarea.titulo;
          fila.descripcion = tarea.descripcion;
          fila.tags = tarea.tags;
          return;
        }
      });
    },
  },
  created() {
    this.listar();
  },
});
</script>

<style scoped></style>
