import take from "lodash/take";
import SpotifyData from "@/services/spotify-data";
import { Artist, Song } from "@/models";

const SearchStatus = {
  CLOSED: "CLOSED",
  OPEN: "OPEN",
  SEARCHING: "SEARCHING",
  SHOWING_RESULTS: "SHOWING_RESULTS"
};

const state = {
  status: SearchStatus.CLOSED,
  artistIds: [],
  songIds: []
};

const getters = {
  isSearching(state) {
    return state.status === SearchStatus.SEARCHING;
  },
  showSearch(state) {
    return state.status !== SearchStatus.CLOSED;
  },
  searchSongIds(state) {
    return state.songIds;
  },
  searchArtistIds(state) {
    return state.artistIds;
  },
  hasSearchResults(state) {
    return state.songIds.length > 0 || state.artistIds.length > 0;
  }
};

const mutations = {
  SEARCH_OPEN(state) {
    state.status = SearchStatus.OPEN;
  },
  SEARCH_START(state) {
    state.status = SearchStatus.SEARCHING;
  },
  SEARCH_ERROR(state) {
    state.status = SearchStatus.CLOSED;
  },
  SEARCH_FINISHED(state, payload) {
    state.status = SearchStatus.SHOWING_RESULTS;
    state.songIds = payload.songIds;
    state.artistIds = payload.artistIds;
  },
  SEARCH_CLOSE(state) {
    state.status = SearchStatus.CLOSED;
    state.artistIds = [];
    state.songIds = [];
  },
  RESET_RECOMMENDATION_STATE(state) {
    state.artistIds = [];
    state.songIds = [];
  }
};

const actions = {
  searchAsync({ commit }, payload) {
    const { query } = payload;

    Promise.all([
      SpotifyData.searchTracks(query).then(results => {
        const songs = take(results.tracks.items, 7).map(Song.fromSpotifyApi);
        songs.forEach(s => commit("ADD_SONG", s));
        return songs;
      }),

      SpotifyData.searchArtists(query).then(results => {
        const artists = take(results.artists.items, 5).map(
          Artist.fromSpotifyApi
        );
        artists.forEach(a => commit("ADD_ARTIST", a));
        return artists;
      })
    ]).then(data => {
      const [songs, artists] = data;
      commit("SEARCH_FINISHED", {
        artistIds: artists.map(a => a.id),
        songIds: songs.map(s => s.id)
      });
    });
  },
  openSearch({ commit }) {
    commit("SEARCH_OPEN");
  },
  closeSearch({ commit }) {
    commit("SEARCH_CLOSE");
  }
};

const search = {
  state,
  getters,
  mutations,
  actions
};
export default search;
