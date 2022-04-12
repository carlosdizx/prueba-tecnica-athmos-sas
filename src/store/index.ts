import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    cambiarTareas: async ({ commit }, tareas: any) => {
      localStorage.setItem("tareas", JSON.stringify(tareas));
    },
    cargarTareas: async ({ commit }) => {
      return localStorage.getItem("tareas");
    },
  },
  modules: {},
});
