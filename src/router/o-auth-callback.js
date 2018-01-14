import { getHashParams } from "@/utils/URLUtils";
import SpotifyAuth from "@/services/spotify-auth";
import { RoutePaths } from "./route-paths";

const oAuthSuccess = {
  path: RoutePaths.HOME,
  query: { login: "success" }
};

/**
 * Manages OAuth2 implicit grant callbacks
 */
export function oAuthCallback(to) {
  const { query, hash } = to;
  const hashParams = getHashParams(hash);

  if (query.error || !hashParams.access_token) {
    const error = to.query.error || true;
    return {
      path: RoutePaths.HOME,
      error
    };
  }

  SpotifyAuth.setAccessToken(hashParams.access_token, hashParams.expires_in);
  return oAuthSuccess;
}
