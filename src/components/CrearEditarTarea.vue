<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="!editar"
        class="float-right teal accent-3"
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon> Agregar tarea
      </v-btn>
      <v-btn
        v-if="editar"
        fab
        dark
        small
        outlined
        color="amber"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card class="py-2">
      <v-card-text>
        <h1 class="text-center">Agregar tarea</h1>
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <v-form @submit.prevent="envio">
            <validation-provider
              v-slot="{ errors }"
              name="Titulo"
              rules="required|min:2|max:20"
            >
              <v-text-field
                v-model="titulo"
                label="Titulo"
                counter
                :error-messages="errors"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Titulo"
              rules="max:30"
            >
              <v-textarea
                v-model="descripcion"
                label="Descripción"
                counter
                :error-messages="errors"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Etiquetas"
              rules="required"
            >
              <v-select
                v-model="tagsSeleccionados"
                label="Etiquetas"
                multiple
                :items="tags"
                counter
                :error-messages="errors"
              />
            </validation-provider>
            <v-switch
              v-model="estado"
              inset
              :label="estado ? 'Completada' : 'Sin terminar'"
            />
            <v-btn
              :disabled="invalid"
              v-if="!editar"
              block
              class="success"
              type="submit"
            >
              Registrar
            </v-btn>
            <v-btn
              :disabled="invalid"
              v-if="editar"
              block
              class="primary"
              type="submit"
            >
              Actualizar
            </v-btn>
          </v-form>
        </ValidationObserver>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from "sweetalert2";

export default Vue.extend({
  name: "CrearTarea",
  data: () => ({
    dialog: false,
    tags: [
      "Tag 1",
      "Tag 2",
      "Tag 3",
      "Tag 4",
      "Tag 5",
      "Tag 6",
      "Tag 7",
      "Tag 8",
    ],
    titulo: "",
    descripcion: "",
    tagsSeleccionados: [],
    estado: false,
  }),
  props: {
    editar: Boolean,
    datos: Object,
  },
  methods: {
    async limpiarDatos(): Promise<void> {
      this.titulo = "";
      this.descripcion = "";
      this.tagsSeleccionados = [];
    },
    async envio(): Promise<void> {
      const datos: any = {
        titulo: this.titulo,
        descripcion: this.descripcion,
        tags: this.tagsSeleccionados,
        estado: this.estado,
      };
      if (!this.editar) {
        this.$emit("registro", datos);
        await Swal.fire({
          title: "Registro existoso!",
          timer: 1500,
          showConfirmButton: false,
          icon: "success",
        });
        await this.limpiarDatos();
        const observer: any = this.$refs.observer;
        if (observer) {
          observer.reset();
        }
      } else {
        datos.id = this.datos.id;
        this.$emit("edicion", datos);
        await Swal.fire({
          title: "Actualización existosa!",
          timer: 1500,
          showConfirmButton: false,
          icon: "success",
        });
      }
      this.dialog = !this.dialog;
    },
  },
  async created() {
    if (this.editar && this.datos) {
      this.titulo = this.datos.titulo;
      this.descripcion = this.datos.descripcion;
      this.tagsSeleccionados = this.datos.tags;
      this.estado = this.datos.estado;
    }
  },
});
</script>

<style scoped></style>
