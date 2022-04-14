<template>
  <v-card class="mx-auto mt-10" max-width="600">
    <v-card-title>
      <h1 class="mx-auto">Iniciar sesión</h1>
    </v-card-title>
    <v-card-subtitle>
      <h5>Usuario: admin</h5>
      <h5>password: 879poiosXg*</h5>
    </v-card-subtitle>
    <v-card-text>
      <v-img
        src="https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_960_720.png"
        class="my-5"
        alt="logo"
      />
      <v-form @submit.prevent="comprobarCredenciales">
        <v-text-field
          prepend-icon="mdi-account"
          outlined
          dense
          label="Usuario"
          type="text"
          v-model="usuario"
        />
        <v-text-field
          prepend-icon="mdi-lock"
          outlined
          dense
          label="Contraseña"
          :type="showPass ? 'text' : 'password'"
          v-model="password"
          @click:append="mostrarPassword"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        />
        <v-btn type="submit" color="primary" block> Iniciar sesión </v-btn>
      </v-form>
      <h5>Sí recargas la página debes volver a iniciar sesión!</h5>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from "sweetalert2";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "AuthLogin",
  data: () => ({
    usuario: "",
    password: "",
    showPass: false,
  }),
  methods: {
    ...mapActions(["cambiarUsuario"]),
    mostrarPassword() {
      this.showPass = !this.showPass;
    },
    async comprobarCredenciales(): Promise<void> {
      console.log(this.usuario, this.password);
      if (this.usuario === "admin" && this.password === "879poiosXg*") {
        const data = {
          usuario: this.usuario,
          password: this.password,
        };
        await this.cambiarUsuario(data);
        await this.$router.push("/home");
      } else {
        await Swal.fire(
          "Credenciales erroeneas",
          "Las credenciales son <br>" +
            " usuario: admin" +
            "<br>password: 879poiosXg*",
          "error"
        );
      }
    },
  },
});
</script>

<style scoped></style>
