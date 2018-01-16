import { listHasId, addIdToList, removeIdFromList } from "@/utils/list-utils";

const state = {
  seedArtistIds: [],
  seedSongIds: []
};

const getters = {
  isSeedArtist(state) {
    return id => !!listHasId(state.seedArtistIds, id);
  },
  isSeedSong(state) {
    return id => !!listHasId(state.seedSongIds, id);
  },
  hasSeeds(state) {
    return state.seedArtistIds.length > 0 || state.seedSongIds.length > 0;
  },
  seeds(state) {
    return {
      artistIds: state.seedArtistIds,
      songIds: state.seedSongIds
    };
  }
};

const mutations = {
  SEED_SONG_ADD(state, payload) {
    state.seedSongIds = addIdToList(state.seedSongIds, payload.id);
  },
  SEED_SONG_REMOVE(state, payload) {
    state.seedSongIds = removeIdFromList(state.seedSongIds, payload.id);
  },
  SEED_ARTIST_ADD(state, payload) {
    state.seedArtistIds = addIdToList(state.seedArtistIds, payload.id);
  },
  SEED_ARTIST_REMOVE(state, payload) {
    state.seedArtistIds = removeIdFromList(state.seedArtistIds, payload.id);
  },
  RESET_RECOMMENDATION_STATE(state) {
    state.seedArtistIds = [];
    state.seedSongIds = [];
  }
};

const actions = {
  addSeed({ commit }, payload) {
    const type =
      payload.type === "artist" ? "SEED_ARTIST_ADD" : "SEED_SONG_ADD";
    commit(type, payload);
  },
  removeSeed({ commit }, payload) {
    const type =
      payload.type === "artist" ? "SEED_ARTIST_REMOVE" : "SEED_SONG_REMOVE";
    commit(type, payload);
  }
};

const recommendationSeeds = { state, getters, mutations, actions };
export default recommendationSeeds;
