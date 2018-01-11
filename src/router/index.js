import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import StartPage from "@/components/StartPage";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Start Page",
      component: StartPage
    },
    {
      path: "/hello-world",
      name: "Hello World",
      component: HelloWorld
    }
  ]
});
