const Koa = require('koa');
const router = require('./launch');
const logger = require('./logger');
const errorHandler = require('./plugins/error-handler');

const app = new Koa();

app.use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app.listen(7610, () => {
  logger.info('App runs on http://127.0.0.1:7610');
});
