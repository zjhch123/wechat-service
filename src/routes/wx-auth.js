const { APP_ID, PACKAGE: package } = require('../constants');
const optionalSearchParamsInterceptor = require('../plugins/optional-search-params-interceptor');
const requiredSearchParamsInterceptor = require('../plugins/required-search-params-interceptor');
const buildURI = require('../utils/build-uri');
const { serverURL } = package;

async function wxAuth (ctx, next) {
  await next();
  const {
    redirect_uri,
    error_uri,
  } = ctx.request.query;

  const serverRedirectURI = encodeURIComponent(buildURI(serverURL, '/wxCodeAuth', {
    redirect_uri: decodeURIComponent(redirect_uri),
    error_uri: decodeURIComponent(error_uri),
  }));

  ctx.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${serverRedirectURI}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`);
}

module.exports = {
  type: 'get',
  path: '/wxAuth',
  middleware: [
    requiredSearchParamsInterceptor('redirect_uri'),
    optionalSearchParamsInterceptor('error_uri', (ctx) => ctx.query.redirect_uri),
    wxAuth,
  ],
};
