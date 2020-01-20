const { APP_SECRET } = require('../constants');

module.exports = async function appSecretInterceptor (ctx, next) {
  const {
    secret,
  } = ctx.request.query;

  if (secret !== APP_SECRET) {
    const msg = `Invalid app secret: ${secret}`;
    ctx.body.msg = msg;
    throw new Error(msg);
  }

  await next();
};
