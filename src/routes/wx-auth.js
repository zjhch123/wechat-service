const { APP_ID, config: { auth: { postdataURI }, serverURL } } = require('../constants');
const authErrorHandler = require('../plugins/auth-error-handler');
const optionalSearchParamsInterceptor = require('../plugins/optional-search-params-interceptor');
const postDataURIWhitelistInterceptor = require('../plugins/postdata-uri-whitelist-interceptor');
const buildURI = require('../utils/build-uri');

async function wxAuth (ctx, next) {
  await next();
  const {
    redirect_uri,
    postdata_uri,
    error_uri,
  } = ctx.request.query;

  const serverRedirectURI = encodeURIComponent(buildURI(serverURL, '/wxCodeAuth', {
    ...(postdata_uri === postdataURI ? { } : { postdata_uri }),
    redirect_uri,
    error_uri,
  }));

  ctx.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${serverRedirectURI}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`);
}

module.exports = {
  type: 'get',
  path: '/wxAuth',
  middleware: [
    optionalSearchParamsInterceptor('redirect_uri', ''),
    optionalSearchParamsInterceptor('postdata_uri', () => postdataURI),
    optionalSearchParamsInterceptor('error_uri', (ctx) => ctx.query.redirect_uri),
    authErrorHandler,
    postDataURIWhitelistInterceptor,
    wxAuth,
  ],
};
