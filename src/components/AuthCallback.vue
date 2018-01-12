<script>
import { getHashParams } from "../utils/URLUtils";
import SpotifyAuth from "../services/SpotifyAuth";

export default {
  name: "AuthCallback",

  beforeRouteEnter(to, from, next) {
    const hashParams = getHashParams(to.hash);
    console.log(hashParams);
    if (hashParams.access_token) {
      SpotifyAuth.setAccessToken(
        hashParams.access_token,
        hashParams.expires_in
      );
    }

    next();
  }
};
</script>
