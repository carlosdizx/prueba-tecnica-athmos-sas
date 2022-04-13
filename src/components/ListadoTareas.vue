<template>
  <v-card>
    <v-data-table
      :headers="columnas"
      :items="filas"
      :search="buscado"
      :custom-filter="filtrarPorLlave"
      class="elevation-1"
      sort-by="estado"
      fixed-header
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
        <v-tooltip color="green" right v-if="seleccionados.length > 0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="marcarTerminadas"
              fab
              class="teal accent-3 mx-3 mt-2"
              top
              right
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </template>
          <span>Marcar como terminadas</span> <v-icon>mdi-check</v-icon>
        </v-tooltip>
        <v-card-text>
          <strong>Pasos inmediatos</strong>
          <br />
          Aqui van los pasos que completaste
          <v-row>
            <v-col cols="8"></v-col>
            <v-col cols="4">
              % Tareas completadas
              <v-progress-linear
                rounded
                class="float-center"
                color="teal accent-3"
                height="25"
              >
                <strong>{{ porcentaje }}%</strong>
              </v-progress-linear>
            </v-col>
          </v-row>
          <br />
          <CrearEditarTarea @registro="agregar($event)" />
          <br />
          <br />
          <br />
        </v-card-text>
        <v-divider />
        <v-text-field
          class="mx-5"
          v-model="buscado"
          label="Buscar una tarea (ingrese titulo o descripción)"
        />
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
      <template v-slot:item.estado="{ item }">
        <v-tooltip color="grey" right v-if="item.estado">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              small
              color="grey"
              outlined
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </template>
          <span>Completada</span>
        </v-tooltip>
        <v-tooltip color="teal" right v-if="!item.estado">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              small
              color="teal"
              outlined
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </template>
          <span>Sin terminar</span>
        </v-tooltip>
      </template>
    </v-data-table>
    {{ filas }}
  </v-card>
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
    total: 0,
    porcentaje: 0,
    buscado: "",
    columnas: [
      { text: "Estado", value: "estado", sortable: true },
      { text: "Titulo", value: "titulo", sortable: false },
      { text: "Descripción", value: "descripcion", sortable: false },
      { text: "Tags", value: "tags", sortable: false },
      { text: "Acciones", value: "acciones", sortable: false },
      { text: "Selecciona", value: "seleccion", sortable: false },
    ],
    filas: [{}],
  }),
  methods: {
    ...mapActions(["cambiarTareas", "cargarTareas"]),
    async agregar(tarea: any): Promise<void> {
      tarea.id = shortid.generate();
      this.filas.push(tarea);
      await this.cambiarTareas(this.filas);
      await this.calcularPorcentaje();
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
        await this.calcularPorcentaje();
        await this.cambiarTareas(this.filas);
      });
    },
    async editar(tarea: any): Promise<void> {
      this.filas.map((fila: any) => {
        if (fila.id === tarea.id) {
          fila.titulo = tarea.titulo;
          fila.descripcion = tarea.descripcion;
          fila.tags = tarea.tags;
          fila.estado = tarea.estado;
          return;
        }
      });
      await this.cambiarTareas(this.filas);
      await this.calcularPorcentaje();
    },
    async marcarTerminadas(): Promise<void> {
      this.seleccionados.forEach((seleccionado: any) => {
        this.filas.map((fila: any) => {
          if (seleccionado.id === fila.id) {
            fila.estado = true;
          }
        });
      });
      await this.cambiarTareas(this.filas);
      await this.calcularPorcentaje();
      this.seleccionados = [];
      await Swal.fire({
        title: "Marcadas como tareas completadas",
        timer: 1500,
        showConfirmButton: false,
        icon: "success",
      });
    },
    async calcularPorcentaje(): Promise<void> {
      const completadas = [];
      this.total = this.filas.length;
      this.filas.forEach((fila: any) => {
        if (fila.estado) {
          completadas.push(fila);
        }
      });
      if (completadas.length > 0) {
        this.porcentaje = Math.round((completadas.length / this.total) * 100);
      } else {
        this.porcentaje = 0;
      }
    },
    filtrarPorLlave(valor: any, buscado: any): boolean {
      if (typeof valor === "string" && typeof buscado === "string") {
        if (buscado.trim().length !== 0) {
          return (
            valor
              .toString()
              .toLocaleUpperCase()
              .indexOf(buscado.toUpperCase()) !== -1
          );
        }
      }
      return false;
    },
  },
  async created() {
    this.filas = [];
    const filas = JSON.parse(
      JSON.parse(JSON.stringify(await this.cargarTareas()))
    );
    if (filas) {
      this.filas = filas;
      await this.calcularPorcentaje();
    }
  },
});
</script>

<style scoped></style>
