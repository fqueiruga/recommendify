import SpotifyData from "@/services/spotify-data";
import { isBlank } from "@/utils/StringUtils";

const authTypes = {
  SET_TOKEN: "SET_TOKEN",
  CLEAR_TOKEN: "CLEAR_TOKEN"
};

const state = {
  token: null,
  expiresAt: 0
};

const getters = {
  authToken(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !isBlank(state.token) && state.expiresAt > Date.now();
  }
};

const mutations = {
  [authTypes.SET_TOKEN](state, payload) {
    const { token, expiresAt } = payload;
    state.token = token;
    state.expiresAt = expiresAt;
    localStorage.setItem("AUTH_TOKEN", token);
    localStorage.setItem("AUTH_TOKEN_EXPIRES_AT", expiresAt);
  },
  [authTypes.CLEAR_TOKEN](state) {
    state.token = null;
    state.expiresAt = 0;
    localStorage.removeItem("AUTH_TOKEN");
    localStorage.removeItem("AUTH_TOKEN_EXPIRES_AT");
  }
};

const actions = {
  setToken({ commit }, payload) {
    commit(authTypes.SET_TOKEN, payload);
    SpotifyData.setAccessToken(payload.token);
  },
  clearToken({ commit }) {
    commit(authTypes.CLEAR_TOKEN);
    SpotifyData.setAccessToken(null);
  },
  loadTokenFromStorage({ commit }) {
    const token = localStorage.getItem("AUTH_TOKEN", "");
    const expiresAt = +localStorage.getItem("AUTH_TOKEN_EXPIRES_AT", 0);
    commit(authTypes.SET_TOKEN, { token, expiresAt });
    SpotifyData.setAccessToken(token);
  }
};

const auth = { state, getters, mutations, actions };
export default auth;
