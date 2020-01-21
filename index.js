const Koa = require('koa');
const Router = require('koa-router');
const log = require('./utils/log');
const wxShare = require('./routes/wx-share');
const clearAll = require('./routes/clear-all');
const wxAuth = require('./routes/wx-auth');
const jsonResponse = require('./plugins/json-response');
const javascriptResponse = require('./plugins/javascript-response');
const errorHandler = require('./plugins/error-handler');
const urlInterceptor = require('./plugins/url-interceptor');
const appSecretInterceptor = require('./plugins/app-secret-interceptor');

const app = new Koa();
const router = new Router();

router.get('/clearAll', jsonResponse, appSecretInterceptor, clearAll);
router.get('/wxShare', javascriptResponse, urlInterceptor, wxShare);
router.get('/wxAuth', wxAuth);

app.use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(7610);
log('App runs on http://127.0.0.1:7610');
