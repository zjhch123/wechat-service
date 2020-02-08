const { URL } = require('url');
const { IS_DEV } = require('../constants');
const { authPostDataURIDomainWhitelist } = require('../package.json');

const whitelist = new Set(authPostDataURIDomainWhitelist);

module.exports = async function authPostDataURIDomainInterceptor (ctx, next) {
  const {
    postdata_uri: postdataURI,
  } = ctx.request.query;

  const { host: postdataHost } = new URL(decodeURIComponent(postdataURI));

  if (IS_DEV || whitelist.has(postdataHost)) {
    await next();
    return;
  }

  throw new Error('postdata_uri invalid');
};
