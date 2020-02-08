const url = require('url');
const { authPostDataURIDomainWhitelist } = require('../package.json');

module.exports = async function authPostDataURIUDomainInterceptor (ctx, next) {
  const {
    postdata_uri: postdataURI,
  } = ctx.request.query;

  for (let i = 0; i < authPostDataURIDomainWhitelist.length; i++) {
    const { host } = url.parse(authPostDataURIDomainWhitelist[i]);
  }

  await next();
};
