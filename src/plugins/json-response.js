const { JSON_CONTENT_TYPE } = require('../constants');

module.exports = async function jsonResponse (ctx, next) {
  ctx.type = JSON_CONTENT_TYPE;
  ctx.body = {
    code: 500,
    msg: 'Server error',
  };

  await next();
};
