const { URL } = require('url');
const { IS_DEV } = require('../constants');
const { authPostDataURIHostWhitelist } = require('../package.json');

const whitelist = new Set(authPostDataURIHostWhitelist);

module.exports = async function authPostDataURIHostInterceptor (ctx, next) {
  const {
    postdata_uri: postdataURI,
  } = ctx.request.query;

  const { host: postdataHost } = new URL(decodeURIComponent(postdataURI));

  if (IS_DEV || whitelist.size === 0 || whitelist.has(postdataHost)) {
    await next();
    return;
  }

  throw new Error('Invalid postdata_uri');
};
