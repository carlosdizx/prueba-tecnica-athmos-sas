import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store";
import Swal from "sweetalert2";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!store.state.usuario) {
      next("/");
      await Swal.fire({
        title: "Debes iniciar sesión primero",
        icon: "info",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
