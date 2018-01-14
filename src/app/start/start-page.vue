<template>
  <div class="wrapper">
    <alert-message v-if="hasAuthError"
                   message="Error signing in with your Spotify account."></alert-message>

    <div src="/static/start-background-min.jpeg"
         class="background-img" />

    <div class="items-wrapper">
      <h1 class="display-3 header">My Spotify Experience</h1>
      <button type="button"
              class="btn btn-outline-light btn-lg explore-button"
              @click="onExploreClick"> Explore </button>
    </div>
  </div>
</template>

<script>
import AlertMessage from "@/components/alert-message";
import SpotifyAuth from "@/services/spotify-auth";

export default {
  name: "StartPage",

  components: {
    AlertMessage
  },

  methods: {
    onExploreClick() {
      SpotifyAuth.redirectToOauthPortal();
    }
  },

  computed: {
    hasAuthError() {
      const query = this.$route.query;
      return query.error && decodeURIComponent(query.error) === "access_denied";
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../styles/vars";

.wrapper {
  height: 100vh;
}

.background-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: all 0.4s ease-out;
  background-image: url("/static/start-background-min.jpeg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(5px);
  transform: scale(1.1);
}

.items-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1000;
  margin: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header {
  margin-bottom: 60px;
  color: $gray-100;
}

.explore-button {
  display: inline-block;
  min-width: 200;
}

.alert-wrapper {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  z-index: 9999;
}
</style>

