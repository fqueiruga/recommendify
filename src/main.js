import Vue from "vue";

Vue.config.productionTip = false;

import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
Vue.component("icon", Icon);

import store from "@/store";
import App from "./App";
import { router } from "./router";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
