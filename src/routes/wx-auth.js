const { APP_ID, PACKAGE: package } = require('../constants');
const authErrorHandler = require('../plugins/auth-error-handler');
const optionalSearchParamsInterceptor = require('../plugins/optional-search-params-interceptor');
const requiredSearchParamsInterceptor = require('../plugins/required-search-params-interceptor');
const postDataURIWhitelistInterceptor = require('../plugins/postdata-uri-whitelist-interceptor');
const buildURI = require('../utils/build-uri');
const { serverURL, auth: { postdataURI } } = package;

async function wxAuth (ctx, next) {
  await next();
  const {
    redirect_uri,
    postdata_uri,
    error_uri,
  } = ctx.request.query;

  const serverRedirectURI = encodeURIComponent(buildURI(serverURL, '/wxCodeAuth', {
    redirect_uri: decodeURIComponent(redirect_uri),
    error_uri: decodeURIComponent(error_uri),
    postdata_uri: decodeURIComponent(postdata_uri),
  }));

  ctx.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${serverRedirectURI}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`);
}

module.exports = {
  type: 'get',
  path: '/wxAuth',
  middleware: [
    requiredSearchParamsInterceptor('redirect_uri'),
    optionalSearchParamsInterceptor('postdata_uri', () => postdataURI),
    optionalSearchParamsInterceptor('error_uri', (ctx) => ctx.query.redirect_uri),
    authErrorHandler,
    postDataURIWhitelistInterceptor,
    wxAuth,
  ],
};
