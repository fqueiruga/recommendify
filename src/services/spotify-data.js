import SpotifyClient from "spotify-web-api-js";
import store from "@/store";
import { router, RoutePaths } from "@/router";
import { apiSearch } from "@/dev-data";

function handleError(err) {
  if (err && err.status === 401) {
    store.dispatch("clearToken");
    router.push({ path: RoutePaths.Home, query: { error: "session_expired" } });
  }
  return err;
}

class SpotifyData {
  constructor() {
    this.spotifyClient = new SpotifyClient();
  }

  setAccessToken(token) {
    this.spotifyClient.setAccessToken(token);
  }

  profile() {
    return this.spotifyClient.getMe().catch(handleError);
  }

  searchTracks(query) {
    return this.spotifyClient
      .searchTracks(`*${query}*`, { limit: 7 })
      .catch(handleError);
  }

  searchArtists(query) {
    return this.spotifyClient
      .searchArtists(`*${query}*`, { limit: 3 })
      .catch(handleError);
  }

  getRecommendations({ tracks, artists }) {
    return this.spotifyClient
      .getRecommendations({
        seed_tracks: tracks,
        seed_artists: artists
      })
      .catch(handleError);
  }

  createPlaylist({ userId, name }) {
    return this.spotifyClient
      .createPlaylist(userId, { name, public: false })
      .catch(handleError);
  }

  addTracksToPlaylist({ userId, playlistId, uris }) {
    return this.spotifyClient
      .addTracksToPlaylist(userId, playlistId, uris)
      .catch(handleError);
  }
}

export default new SpotifyData();
