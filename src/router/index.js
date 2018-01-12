import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from "@/components/HelloWorld";
import AuthCallback from "@/components/AuthCallback";
import StartPage from "@/components/StartPage";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Start Page",
      component: StartPage
    },
    {
      path: "/callback",
      name: "Hello World",
      component: AuthCallback
    }
  ]
});
