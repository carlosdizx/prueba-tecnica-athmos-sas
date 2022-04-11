<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="float-right success" text v-bind="attrs" v-on="on">
        <v-icon>mdi-plus</v-icon> Agregar tarea
      </v-btn>
    </template>
    <v-card class="py-2">
      <v-card-text>
        <h1 class="text-center">Agregar tarea</h1>
        <v-form>
          <v-text-field v-model="titulo" label="Titulo" counter />
          <v-textarea v-model="descripcion" label="Descripción" counter />
          <v-select
            v-model="tagsSeleccionados"
            label="Tags"
            multiple
            :items="tags"
            counter
          />
          <v-btn block class="success" type="submit"> Registrar </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

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
    //------- models -------
    titulo: "",
    descripcion: "",
    tagsSeleccionados: [],
  }),
  methods: {
    comprobarCampos(): boolean {
      return true;
    },
    registrar(): void {
      this.$emit("registro");
    },
  },
});
</script>

<style scoped></style>
