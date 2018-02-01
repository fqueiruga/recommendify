import { generateRandomString } from "../utils/StringUtils";
import { toQueryString } from "../utils/URLUtils";

const STATE_KEY = "SPOTIFY_AUTH_STATE";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private"
];
const CLIENT_ID = "56321f14e7a4481e81dac3794e846143";
const REDIRECT_URI = "http://localhost:8080/callback";

function getLoginUrl(state, scopes) {
  const queryString = toQueryString({
    response_type: "token",
    client_id: CLIENT_ID,
    scope: scopes.join(" "),
    redirect_uri: REDIRECT_URI,
    state,
    show_dialog: true
  });
  return `https://accounts.spotify.com/authorize?${queryString}`;
}

class SpotifyAuth {
  redirectToOauthPortal() {
    const state = generateRandomString(16);
    localStorage.setItem(STATE_KEY, state);
    window.location = getLoginUrl(state, SCOPES);
  }
}

export default new SpotifyAuth();
