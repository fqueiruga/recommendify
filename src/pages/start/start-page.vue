<template>
  <div class="wrapper">
    <alert-message v-if="errorMessage"
                   :message="errorMessage"></alert-message>

    <div src="/static/start-background-min.jpeg"
         class="background-img" />

    <div class="items-wrapper">
      <h1 class="header">Recommendify</h1>
      <button type="button"
              class="btn btn-outline-light btn-lg explore-button"
              @click="onExploreClick"> Explore </button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

import AlertMessage from "@/components/alert-message";
import SpotifyAuth from "@/services/spotify-auth";

@Component({
  components: {
    AlertMessage
  }
})
export default class StartPage extends Vue {
  get errorMessage() {
    const { error } = this.$route.query;
    switch (decodeURIComponent(error)) {
      case "access_denied":
        return "Error signing in with your Spotify account.";
      case "not_authenticated":
        return "You must sign in with your Spotify account to continue.";
      case "session_expired":
        return "Your session has expired. Sign in with your Spotify account to continue.";
      default:
        return null;
    }
  }

  onExploreClick() {
    SpotifyAuth.redirectToOauthPortal();
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/vars";

.wrapper {
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
  font-size: 2.5rem;
  text-transform: uppercase;
  padding: 2rem;
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
  z-index: $z-index-alert;
}
</style>
