const { config: { auth: { postdataURI } } } = require('././../constants');
const logger = require('../logger');
const {
  getUserInfo,
  postUserInfo,
  redirectUserInfo,
} = require('../services/wx-code-auth-service');
const authErrorHandler = require('../plugins/auth-error-handler');
const optionalSearchParamsInterceptor = require('../plugins/optional-search-params-interceptor');
const requiredSearchParamsInterceptor = require('../plugins/required-search-params-interceptor');
const postDataURIWhitelistInterceptor = require('../plugins/postdata-uri-whitelist-interceptor');
const buildURI = require('../utils/build-uri');

async function wxCodeAuth (ctx, next) {
  await next();

  const {
    code,
    redirect_uri,
    postdata_uri,
    followRedirect,
  } = ctx.request.query;

  logger.info(`Auth start, code: ${code}`);

  const userInfo = await getUserInfo(code);

  logger.info('Auth successfully, userInfo:\n%O', userInfo);

  /* istanbul ignore next */
  const postTarget = postdata_uri;
  logger.info(`Auth, postdata_uri: ${postTarget}`);

  if (followRedirect) {
    logger.info(`Auth, follow redirect to ${postTarget}`);
    ctx.body = redirectUserInfo(postTarget, userInfo);
    return;
  }

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
    requiredSearchParamsInterceptor('code'),
    optionalSearchParamsInterceptor('postdata_uri', () => postdataURI),
    optionalSearchParamsInterceptor('followRedirect', false),
    optionalSearchParamsInterceptor('redirect_uri', ''),
    optionalSearchParamsInterceptor('error_uri', (ctx) => ctx.query.redirect_uri),
    authErrorHandler,
    postDataURIWhitelistInterceptor,
    wxCodeAuth,
  ],
};
