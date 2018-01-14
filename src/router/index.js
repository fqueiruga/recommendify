import Vue from "vue";
import Router from "vue-router";

import { Routes } from "./routes";
import { RoutePaths } from "./route-paths";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: Routes
});

export { router, RoutePaths };
