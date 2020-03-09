const log = require('../utils/log');
const { IS_DEV, PACKAGE: package } = require('../constants');
const {
  getUserInfo,
  postUserInfo,
} = require('../services/wx-code-auth-service');
const authErrorHandler = require('../plugins/auth-error-handler');
const optionalSearchParamsInterceptor = require('../plugins/optional-search-params-interceptor');
const requiredSearchParamsInterceptor = require('../plugins/required-search-params-interceptor');

const { auth: { postdataURI } } = package;

async function wxCodeAuth (ctx, next) {
  await next();

  const {
    code,
    redirect_uri,
  } = ctx.request.query;

  const redirectURI = decodeURIComponent(redirect_uri);

  const postTarget = IS_DEV ? 'https://httpbin.org/post' : postdataURI;

  log(`Auth start, code: ${code}, postdata_uri: ${postTarget}, redirect_uri: ${redirectURI}`);

  const userInfo = await getUserInfo(code);

  log(`Auth successfully, code: ${code}, userInfo:\n${JSON.stringify(userInfo)}`);

  await postUserInfo(postTarget, userInfo)
    .then(response => {
      log(`Post userInfo successfully, response status: ${response.status}`);
    });

  if (IS_DEV) {
    ctx.body = {
      code: 200,
      data: userInfo,
    };
    return;
  }

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