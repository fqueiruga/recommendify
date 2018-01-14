<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
// Imports variables file containing bootstrap overrides
@import "./styles/_vars.scss";
@import "~bootstrap/scss/bootstrap";

html {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}
</style>
