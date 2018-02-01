import keys from "lodash/keys";

/**
 * Obtains parameters from the hash of the URL
 * {@link Taken from https://github.com/spotify/web-api-auth-examples/blob/master/implicit_grant/public/index.html}
 *
 * @return Object
 */
export function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

/**
 * Builds a query string from map of params
 *
 * @param {Object} obj
 * @return String
 */
export function toQueryString(obj) {
  return keys(obj)
    .map(key => {
      return [encodeURIComponent(key), encodeURIComponent(obj[key])].join("=");
    })
    .join("&");
}
