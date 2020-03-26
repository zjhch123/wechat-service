const { URL } = require('url');
const { config: { auth: { postdataURI, postdataURIHostWhitelist } } } = require('../constants');

const defaultWhitelists = [
  '127',
  '192',
  '10',
];

module.exports = async function postdataURIWhitelistInterceptor (ctx, next) {
  const queryPostdataURI = decodeURIComponent(ctx.request.query.postdata_uri);

  if (queryPostdataURI === postdataURI) {
    await next();
    return;
  }

  const url = new URL('', queryPostdataURI);
  const queryPostdataURIHost = url.host;

  for (let i = 0; i < defaultWhitelists.length; i += 1) {
    if (queryPostdataURIHost.startsWith(defaultWhitelists[i])) {
      await next();
      return;
    }
  }

  for (let i = 0; i < postdataURIHostWhitelist.length; i += 1) {
    const whitelistHost = postdataURIHostWhitelist[i];
    if (queryPostdataURIHost === whitelistHost) {
      await next();
      return;
    }
  }

  throw new Error('Invalid postdata_uri');
};
