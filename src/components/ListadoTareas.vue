<template>
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
            @click="eliminar(null)"
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
      <v-btn fab outlined small color="red" @click="eliminar(item)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import CrearEditarTarea from "@/components/CrearEditarTarea.vue";
import Vue from "vue";
import Swal from "sweetalert2";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortid = require("shortid");
import { mapActions } from "vuex";

export default Vue.extend({
  name: "ListadoTareas",
  components: { CrearEditarTarea },
  data: () => ({
    seleccionados: [],
    columnas: [
      { text: "Selecciona", value: "seleccion", sortable: false },
      { text: "Titulo", value: "titulo" },
      { text: "Descripción", value: "descripcion" },
      { text: "Tags", value: "tags" },
      { text: "Acciones", value: "acciones", sortable: false },
    ],
    filas: [{}],
  }),
  methods: {
    ...mapActions(["cambiarTareas", "cargarTareas"]),
    async agregar(tarea: any): Promise<void> {
      tarea.id = shortid.generate();
      this.filas.push(tarea);
      await this.cambiarTareas(this.filas);
    },
    async eliminar(tareaDel: any): Promise<void> {
      Swal.fire({
        title: `¿Quieres eliminar ${
          tareaDel ? "la tarea" : "las tareas seleccionadas"
        }?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff0505",
        cancelButtonColor: "#747474",
        confirmButtonText: "Si, eliminar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await Swal.fire({
            title: "Eliminación exitosa",
            timer: 1500,
            showConfirmButton: false,
            icon: "success",
          });
          if (tareaDel) {
            this.filas = this.filas.filter((tarea: any) => tarea !== tareaDel);
          } else {
            this.seleccionados.forEach((seleccionado) => {
              this.filas = this.filas.filter(
                (tarea: any) => tarea !== seleccionado
              );
            });
          }
          this.seleccionados = [];
        }
        await this.cambiarTareas(this.filas);
      });
    },
    async editar(tarea: any): Promise<void> {
      this.filas.map((fila: any) => {
        if (fila.id === tarea.id) {
          fila.titulo = tarea.titulo;
          fila.descripcion = tarea.descripcion;
          fila.tags = tarea.tags;
          return;
        }
      });
      await this.cambiarTareas(this.filas);
    },
  },
  async created() {
    this.filas = [];
    this.filas = JSON.parse(
      JSON.parse(JSON.stringify(await this.cargarTareas()))
    );
  },
});
</script>

<style scoped></style>
