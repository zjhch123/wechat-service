const { APP_ID } = require('../constants');

module.exports = async function wxAuth (ctx, next) {
  await next();
  const {
    redirect_uri, // TODO: Will add logic of verifying the domain
  } = ctx.request.query;

  const encodedRedirectURI = encodeURIComponent(redirect_uri);
  ctx.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${encodedRedirectURI}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`);
};
