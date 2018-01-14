import { generateRandomString, isBlank } from "../utils/StringUtils";

const STATE_KEY = "SPOTIFY_AUTH_STATE";
const TOKEN_KEY = "SPOTIFY_AUTH_TOKEN";
const EXPIRES_AT_KEY = "SPOTIFY_AUTH_EXPIRES_AT";
const SCOPES = ["user-read-private"];
const CLIENT_ID = "56321f14e7a4481e81dac3794e846143";
const REDIRECT_URI = "http://localhost:8080/callback";

function getLoginUrl(state, scopes) {
  const url = `
    https://accounts.spotify.com/authorize
      ?response_type=token
      &client_id=${encodeURIComponent(CLIENT_ID)}
      &scope=${encodeURIComponent(scopes.join(" "))}
      &redirect_uri=${encodeURIComponent(REDIRECT_URI)}
      &state=${encodeURIComponent(state)}
      &show_dialog=${encodeURIComponent(true)}
  `;
  return url.replace(/\s/g, "");
}

class SpotifyAuth {
  redirectToOauthPortal() {
    const state = generateRandomString(16);
    localStorage.setItem(STATE_KEY, state);
    window.location = getLoginUrl(state, SCOPES);
  }

  get isLoggedIn() {
    return isBlank(this.getAccessToken);
  }

  getAccessToken() {
    const expiresAt = 0 + localStorage.getItem(EXPIRES_AT_KEY, "0");
    if (expiresAt < Date.now()) return "";
    return localStorage.getItem(TOKEN_KEY, "");
  }

  setAccessToken(token, expiresIn) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EXPIRES_AT_KEY, Date.now() + expiresIn * 1000);
  }
}

export default new SpotifyAuth();
