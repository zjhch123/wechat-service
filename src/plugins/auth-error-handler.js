const { URL } = require('url');
const logger = require('../logger');
const WechatError = require('../errors/wechat-error');

module.exports = async function authErrorHandler (ctx, next) {
  try {
    await next();
  } catch (e) {
    logger.error(e);
    const {
      error_uri,
    } = ctx.request.query;

    const errorURI = new URL(error_uri);

    if (e instanceof WechatError) {
      errorURI.searchParams.append('errcode', e.errcode);
      errorURI.searchParams.append('errmsg', e.errmsg);
    }

    ctx.status = 302;
    ctx.redirect(errorURI.toString());
    throw e;
  }
};
