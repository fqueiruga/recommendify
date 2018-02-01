/**
 * Generates a random string containing numbers and letters
 * {@link Taken from https://github.com/spotify/web-api-auth-examples/blob/master/implicit_grant/public/index.html}
 *
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
export function generateRandomString(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/**
 * Tells whether a string is blank
 *
 * @return {boolean}
 */
export function isBlank(str) {
  return !str || /^\s*$/.test(str);
}
