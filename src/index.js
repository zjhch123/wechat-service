const Koa = require('koa');
const router = require('./launch');
const log = require('./utils/log');
const errorHandler = require('./plugins/error-handler');

const app = new Koa();

app.use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(7610);
log('App runs on http://127.0.0.1:7610');
