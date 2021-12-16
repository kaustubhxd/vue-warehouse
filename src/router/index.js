import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Browse",
    component: Home,
  },
  {
    path: "/:id",
    name: "Details",
    component: () => import(/* webpackChunkName: "about" */ "../views/Warehouse.vue"),
    meta: { transitionName: "slide" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _, next) => {
  const possibleRoutes = routes.map((route) => route.name);
  console.log(to);
  console.log(possibleRoutes);
  if (possibleRoutes.includes(to.name)) {
    next();
  } else {
    next({ name: "Browse" });
  }
});

export default router;
