const { URL } = require('url');

module.exports = function buildURI (host, path, searchParams) {
  const baseHost = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7610' : host;
  const uri = new URL(path, baseHost);

  Object.keys(searchParams).forEach(param =>
    uri.searchParams.append(param, searchParams[param]));

  return uri.toString();
};
