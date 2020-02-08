const log = require('../utils/log');

module.exports = async function errorHandler (ctx, next) {
  try {
    await next();
  } catch (e) {
    ctx.status = 400;
    log(`[Error] ${e.message}`);
  }
};
