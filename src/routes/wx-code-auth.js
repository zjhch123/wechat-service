const logger = require('../logger');
const { IS_DEV, PACKAGE: package } = require('../constants');
const {
  getUserInfo,
  postUserInfo,
} = require('../services/wx-code-auth-service');
const authErrorHandler = require('../plugins/auth-error-handler');
const optionalSearchParamsInterceptor = require('../plugins/optional-search-params-interceptor');
const requiredSearchParamsInterceptor = require('../plugins/required-search-params-interceptor');
const buildURI = require('../utils/build-uri');

const { auth: { postdataURI } } = package;

async function wxCodeAuth (ctx, next) {
  await next();

  const {
    code,
    redirect_uri,
  } = ctx.request.query;

  logger.info(`Auth start, code: ${code}`);

  const userInfo = await getUserInfo(code);

  logger.info(`Auth successfully, userInfo:\n${JSON.stringify(userInfo)}`);

  const postTarget = IS_DEV ? 'https://httpbin.org/post' : postdataURI;

  logger.info(`Auth, postdata_uri: ${postTarget}`);

  const response = await postUserInfo(postTarget, userInfo);

  logger.info(`Post userInfo successfully, response status: ${response.status}|${response.statusText}`);

  if (IS_DEV) {
    ctx.body = {
      code: 200,
      data: userInfo,
    };
    return;
  }

  const redirectURI = buildURI(decodeURIComponent(redirect_uri), '', {
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
    requiredSearchParamsInterceptor('code', 'redirect_uri'),
    optionalSearchParamsInterceptor('error_uri', (ctx) => ctx.query.redirect_uri),
    authErrorHandler,
    wxCodeAuth,
  ],
};
