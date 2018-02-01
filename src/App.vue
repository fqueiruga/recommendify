<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions } from "vuex";
import Component from "vue-class-component";

@Component({
  methods: { ...mapActions(["loadTokenFromStorage"]) }
})
export default class App extends Vue {
  created() {
    this.loadTokenFromStorage();
  }
}
</script>

<style lang="scss">
// Imports variables file containing bootstrap overrides
@import "./styles/_vars.scss";
@import "~bootstrap/scss/bootstrap";

html {
  font-family: Open Sans, Helvetica, Arial, sans-serif;
  height: 100vh;
}

body {
  min-height: 100%;
  margin: 0px;
  display: flex;
}

#app {
  flex: 1;
}

/* OVERRIDES */
.btn-secondary {
  color: $white;

  &:hover,
  &:focus,
  &:active {
    color: $white !important;
  }
}
</style>
