const { URL } = require('url');
const WechatError = require('../errors/wechat-error');

module.exports = async function authErrorHandler (ctx, next) {
  try {
    await next();
  } catch (e) {
    const {
      error_uri: errorURI,
    } = ctx.request.query;

    const redirectURI = new URL(decodeURIComponent(errorURI));

    if (e instanceof WechatError) {
      redirectURI.searchParams.append('errcode', e.errcode);
      redirectURI.searchParams.append('errmsg', e.errmsg);
    }

    ctx.redirect(redirectURI.toString());
    throw e;
  }
};
