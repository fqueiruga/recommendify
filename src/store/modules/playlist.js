import SpotifyData from "@/services/spotify-data";
import { addIdToList } from "@/utils/list-utils";
import { Song, Playlist } from "@/models";

const PlaylistStatus = {
  CLOSED: "CLOSED",
  OPEN: "OPEN",
  GENERATING: "GENERATING",
  SAVING: "SAVING",
  SAVED: "SAVED"
};

const state = {
  status: PlaylistStatus.CLOSED,
  songIds: []
};

const getters = {
  isGeneratingPlaylist(state) {
    return state.status === PlaylistStatus.GENERATING;
  },
  isSavingPlaylist(state) {
    return state.status === PlaylistStatus.SAVING;
  },
  isPlaylistSaved(state) {
    return state.status === PlaylistStatus.SAVED;
  },
  showPlaylist(state) {
    return [
      PlaylistStatus.OPEN,
      PlaylistStatus.SAVING,
      PlaylistStatus.SAVED
    ].includes(state.status);
  },
  playlistSongIds(state) {
    return state.songIds;
  }
};

const mutations = {
  PLAYLIST_GENERATE(state) {
    state.status = PlaylistStatus.GENERATING;
  },
  PLAYLIST_SAVE(state) {
    state.status = PlaylistStatus.SAVING;
  },
  PLAYLIST_SAVED(state) {
    state.status = PlaylistStatus.SAVED;
  },
  PLAYLIST_OPEN(state) {
    state.status = PlaylistStatus.OPEN;
  },
  PLAYLIST_CLOSE(state) {
    state.status = PlaylistStatus.CLOSED;
  },
  PLAYLIST_SONG_ADD(state, payload) {
    state.songIds = addIdToList(state.songIds, payload.id);
  },
  RESET_RECOMMENDATION_STATE(state) {
    state.status = PlaylistStatus.CLOSED;
    state.songIds = [];
  }
};

const actions = {
  generateSuggestedPlaylist({ commit }, payload) {
    const { artistIds, songIds } = payload;
    commit("PLAYLIST_GENERATE");

    SpotifyData.getRecommendations({
      tracks: songIds,
      artists: artistIds
    })
      .then(suggestions => {
        suggestions.tracks.map(Song.fromSpotifyApi).forEach(song => {
          commit("PLAYLIST_SONG_ADD", song);
        });
        commit("PLAYLIST_OPEN");
      })
      .catch(err => {
        console.log("Error generating playlist", err);
        commit("PLAYLIST_CLOSE");
      });
  },

  savePlaylist({ commit }, { userId, tracks }) {
    commit("PLAYLIST_SAVE");

    const name = `Recommendify + ${new Date()}`;
    SpotifyData.createPlaylist({ userId, name })
      .then(Playlist.fromSpotifyApi)
      .then(playlist =>
        SpotifyData.addTracksToPlaylist({
          userId,
          playlistId: playlist.id,
          uris: tracks.map(t => t.uri)
        })
      )
      .then(() => commit("PLAYLIST_SAVED"))
      .catch(err => {
        console.log("Error saving playlist", err);
        commit("PLAYLIST_SAVED");
      });
  },

  resetRecommendationState({ commit }) {
    commit("RESET_RECOMMENDATION_STATE");
  }
};

const playlist = { state, getters, mutations, actions };
export default playlist;
