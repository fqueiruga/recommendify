import { getHashParams } from "@/utils/URLUtils";
import store from "@/store";
import { RoutePaths } from "./route-paths";

/**
 * Manages OAuth2 implicit grant callbacks
 */
export function oAuthCallback(to) {
  const { query, hash } = to;
  const hashParams = getHashParams(hash);

  if (query.error || !hashParams.access_token) {
    const error = to.query.error || true;
    return { path: RoutePaths.Home, error };
  }

  store.dispatch("setToken", {
    token: hashParams.access_token,
    expiresAt: Date.now() + hashParams.expires_in * 1000
  });
  return { path: RoutePaths.Explore, hash: "" };
}
