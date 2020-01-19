const validateUrl = require('../utils/validateUrl');

module.exports = async function errorHandler (ctx, next) {
  const {
    referer: url,
  } = ctx.headers;

  if (!validateUrl(url)) {
    throw new Error(`Invalid url: ${url}`);
  }

  await next();
};
