const { APP_ID, config: { serverURL } } = require('../constants');
const authErrorHandler = require('../plugins/auth-error-handler');
const authServicesInterceptor = require('../plugins/auth-services-interceptor');
const optionalSearchParamsInterceptor = require('../plugins/optional-search-params-interceptor');
const requiredSearchParamsInterceptor = require('../plugins/required-search-params-interceptor');
const buildURI = require('../utils/build-uri');

async function wxAuth (ctx, next) {
  await next();
  const {
    redirect_uri,
    service_id,
    error_uri,
  } = ctx.request.query;

  const serverRedirectURI = encodeURIComponent(buildURI(serverURL, '/wxCodeAuth', {
    service_id,
    redirect_uri,
    error_uri,
  }));

  ctx.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${serverRedirectURI}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`);
}

module.exports = {
  type: 'get',
  path: '/wxAuth',
  middleware: [
    optionalSearchParamsInterceptor('error_uri', (ctx) => ctx.query.redirect_uri),
    requiredSearchParamsInterceptor('redirect_uri'),
    requiredSearchParamsInterceptor('service_id'),
    authErrorHandler,
    authServicesInterceptor,
    wxAuth,
  ],
};
