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

  const userInfo = await getUserInfo(code);

  if (IS_DEV) {
    await postUserInfo('https://httpbin.org/post', userInfo).then(data => data.json()).then(data => log(JSON.stringify(data)));
    ctx.body = {
      code: 200,
      data: userInfo,
    };
    return;
  }

  await postUserInfo(decodeURIComponent(postdataURI), userInfo);

  ctx.redirect(decodeURIComponent(redirectURI));
};
