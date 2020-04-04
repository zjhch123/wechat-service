const { config: { auth: { services } } } = require('././../constants');
const logger = require('../logger');
const {
  getUserInfo,
  postUserInfo,
} = require('../services/wx-code-auth-service');
const authErrorHandler = require('../plugins/auth-error-handler');
const optionalSearchParamsInterceptor = require('../plugins/optional-search-params-interceptor');
const requiredSearchParamsInterceptor = require('../plugins/required-search-params-interceptor');
const authServicesInterceptor = require('../plugins/auth-services-interceptor');
const buildURI = require('../utils/build-uri');

async function wxCodeAuth (ctx, next) {
  await next();

  const {
    code,
    redirect_uri,
    service_id,
  } = ctx.request.query;

  logger.info(`Auth start, code: ${code}`);

  const userInfo = await getUserInfo(code);

  logger.info('Auth successfully, userInfo:\n%O', userInfo);

  const service = services.filter(({ id }) => id === service_id)[0];
  const postTarget = service.url;
  logger.info(`Auth, service: ${JSON.stringify(service)}`);

  const response = await postUserInfo(postTarget, userInfo);
  logger.info(`Post userInfo successfully, response status: ${response.status}|${response.statusText}`);
  const redirectURI = buildURI(redirect_uri, '', {
    openid: userInfo.openid,
    access_token: userInfo.access_token,
  });

  logger.info(`Auth, redirect_uri ${redirectURI}`);
  ctx.redirect(redirectURI);
}

module.exports = {
  type: 'get',
  path: '/wxCodeAuth',
  middleware: [
    requiredSearchParamsInterceptor('code', 'redirect_uri', 'service_id'),
    optionalSearchParamsInterceptor('error_uri', (ctx) => ctx.query.redirect_uri),
    authErrorHandler,
    authServicesInterceptor,
    wxCodeAuth,
  ],
};
