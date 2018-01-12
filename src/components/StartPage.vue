<template>
  <div class="container">
    <h1 class="display-3 header">My Spotify Experience</h1>

    <button type="button" class="btn btn-outline-primary btn-lg explore-button" @click="onExploreClick"> Explore </button>
  </div>
</template>

<script>
import SpotifyAuth from "../services/SpotifyAuth";

export default {
  name: "StartPage",

  methods: {
    onExploreClick() {
      SpotifyAuth.redirectToOauthPortal();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/vars";

.container {
  margin: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header {
  /* width: 100%; */
  margin-bottom: 60px;
}

.explore-button {
  display: inline-block;
  //   // border: 1px solid $primary;
  //   /* width: 100%; */
  min-width: 200;
}
</style>

