const Router = require('koa-router');
const requireDir = require('require-dir');
const log = require('./utils/log');
const { APP_ID, APP_SECRET } = require('./constants');

if (APP_ID === '' || APP_SECRET === '') {
  throw new Error('Please set your appId and appSecret first!');
}

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
