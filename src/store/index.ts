import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: null,
  },
  getters: {},
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload;
    },
  },
  actions: {
    cambiarTareas: async ({ commit }, tareas: any) => {
      localStorage.setItem("tareas", JSON.stringify(tareas));
    },
    cargarTareas: async ({ commit }) => {
      return localStorage.getItem("tareas");
    },
    cambiarUsuario: async ({ commit }, usuario: any) => {
      commit("setUsuario", usuario);
    },
  },
  modules: {},
});
