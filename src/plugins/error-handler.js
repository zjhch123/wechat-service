const logger = require('../logger');

module.exports = async function errorHandler (ctx, next) {
  try {
    await next();
  } catch (e) {
    if (ctx.status === 200) {
      ctx.status = 400;
    }

    logger.error(e);
  }
};
