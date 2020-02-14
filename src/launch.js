const Router = require('koa-router');
const requireDir = require('require-dir');
const log = require('./utils/log');

log('Launch App...');

const routes = requireDir('./routes');

const router = new Router();

Object.keys(routes).forEach(key => {
  const {
    type = 'get',
    path,
    middleware,
  } = routes[key];

  log(`Register controller, type: ${type}, path: ${path}`);

  router[type](path, ...middleware);
});

log('Launch successfully!');

module.exports = router;
