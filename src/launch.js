const Router = require('koa-router');
const requireDir = require('require-dir');
const logger = require('./logger');

logger.info('Launch App...');

const routes = requireDir('./routes');

const router = new Router();

Object.keys(routes).forEach(key => {
  const {
    type = 'get',
    path,
    middleware,
  } = routes[key];

  logger.info(`Register controller, type: ${type}, path: ${path}`);

  router[type](path, ...middleware);
});

logger.info('Launch successfully!');

module.exports = router;
