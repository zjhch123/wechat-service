const { URL } = require('url');

module.exports = function buildURI (host, path, searchParams) {
  const baseHost = host;
  const uri = new URL(path, baseHost);

  Object.keys(searchParams).forEach(param =>
    uri.searchParams.append(param, searchParams[param]));

  return uri.toString();
};
