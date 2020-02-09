const log = require('../utils/log');
const { IS_DEV } = require('../constants');
const {
  getUserInfo,
  postUserInfo,
} = require('../services/wx-code-auth-service');

module.exports = async function wxCodeAuth (ctx, next) {
  await next();

  const {
    code,
    redirect_uri: redirectURI,
    postdata_uri: postdataURI,
  } = ctx.request.query;

  log(`Auth start, code: ${code}, postdata_uri: ${postdataURI}, redirect_uri: ${redirectURI}`);

  const userInfo = await getUserInfo(code);

  log(`Auth successfully, code: ${code}, userInfo:\n${JSON.stringify(userInfo)}`);

  const postTarget = IS_DEV ? 'https://httpbin.org/post' : decodeURIComponent(postdataURI);

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

  ctx.redirect(decodeURIComponent(redirectURI));
};
