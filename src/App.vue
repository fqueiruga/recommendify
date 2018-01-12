<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
// Imports variables file containing bootstrap overrides
@import "./styles/_vars.scss";
@import "~bootstrap/scss/bootstrap";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
