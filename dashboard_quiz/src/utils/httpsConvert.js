export function ensureHttps(url) {
  if (typeof url !== "string") {
    throw new TypeError("Input must be a string");
  }

  // Use replace to change http to https only if it starts with http
  const secureUrl = url.replace(/^http:/, "http:"); //todo https
  // console.log(secureUrl);
  return secureUrl;
}
