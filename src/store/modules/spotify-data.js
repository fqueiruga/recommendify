const state = {
  artists: {},
  songs: {}
};

const getters = {
  getArtistById(state) {
    return id => state.artists[id];
  },
  getSongById(state) {
    return id => state.songs[id];
  }
};

const mutations = {
  ADD_ARTIST(state, payload) {
    state.artists[payload.id] = payload;
  },
  PLAYLIST_SONG_ADD(state, payload) {
    state.songs[payload.id] = payload;
  },
  ADD_SONG(state, payload) {
    state.songs[payload.id] = payload;
  },
  RESET_RECOMMENDATION_STATE(state) {
    state.artists = {};
    state.songs = {};
  }
};

const actions = {};

const spotifyData = { state, getters, mutations, actions };
export default spotifyData;
