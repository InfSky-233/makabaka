import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home/index"),
  },
  {
    path: "/rotate",
    name: "Rotate",
    component: () => import("@/views/Rotate/index"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
