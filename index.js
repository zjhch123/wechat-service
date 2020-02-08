const Koa = require('koa');
const Router = require('koa-router');
const log = require('./utils/log');
const wxAuth = require('./routes/wx-auth');
const wxShare = require('./routes/wx-share');
const clearAll = require('./routes/clear-all');
const wxCodeAuth = require('./routes/wx-code-auth');
const jsonResponse = require('./plugins/json-response');
const errorHandler = require('./plugins/error-handler');
const javascriptResponse = require('./plugins/javascript-response');
const appSecretInterceptor = require('./plugins/app-secret-interceptor');
const authDomainInterceptor = require('./plugins/auth-domain-interceptor');
const searchParamsInterceptor = require('./plugins/search-params-interceptor');

const app = new Koa();
const router = new Router();

router.get('/clearAll',
  searchParamsInterceptor('secret'),
  jsonResponse, appSecretInterceptor, clearAll);

router.get('/wxShare', javascriptResponse, wxShare);

router.get('/wxAuth',
  searchParamsInterceptor('redirect_uri', 'postdata_uri', 'error_uri'),
  wxAuth);

router.get('/wxCodeAuth',
  searchParamsInterceptor('redirect_uri', 'postdata_uri', 'error_uri'),
  authDomainInterceptor,
  wxCodeAuth);

app.use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(7610);
log('App runs on http://127.0.0.1:7610');
