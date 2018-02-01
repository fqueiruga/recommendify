import SpotifyData from "@/services/spotify-data";

const userTypes = {
  SET_USER: "SET_USER"
};

const state = {
  id: null,
  country: null
};

const getters = {
  userId(state) {
    return state.id;
  }
};

const mutations = {
  [userTypes.SET_USER](state, payload) {
    state.id = payload.id;
    state.country = payload.country;
  }
};

const actions = {
  loadProfile({ commit }) {
    return SpotifyData.profile().then(profile =>
      commit(userTypes.SET_USER, profile)
    );
  }
};

const user = {
  state,
  getters,
  mutations,
  actions
};
export default user;
