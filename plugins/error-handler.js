const log = require('../utils/log');

module.exports = async function errorHandler (_, next) {
  try {
    await next();
  } catch (e) {
    log(`[Error] ${e.message}`);
  }
};
