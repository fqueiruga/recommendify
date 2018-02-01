import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import auth from "./modules/auth";
import user from "./modules/user";
import search from "./modules/search";
import spotifyData from "./modules/spotify-data";
import recommendationSeeds from "./modules/recommendation-seeds";
import playlist from "./modules/playlist";

const store = new Vuex.Store({
  modules: {
    auth,
    user,
    search,
    spotifyData,
    recommendationSeeds,
    playlist
  }
});

export default store;
