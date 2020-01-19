const { JAVASCRIPT_CONTENT_TYPE } = require('../constants');

module.exports = async function errorHandler (ctx, next) {
  ctx.type = JAVASCRIPT_CONTENT_TYPE;
  ctx.body = '';

  await next();
};
