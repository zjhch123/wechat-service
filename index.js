const Koa = require('koa');
const Router = require('koa-router');
const log = require('./utils/log');
const wxAuth = require('./routes/wx-auth');
const wxShare = require('./routes/wx-share');
const clearAll = require('./routes/clear-all');
const wxCodeAuth = require('./routes/wx-code-auth');
const jsonResponse = require('./plugins/json-response');
const errorHandler = require('./plugins/error-handler');
const authErrorHandler = require('./plugins/auth-error-handler');
const javascriptResponse = require('./plugins/javascript-response');
const appSecretInterceptor = require('./plugins/app-secret-interceptor');
const optionalSearchParamsInterceptor = require('./plugins/optional-search-params-interceptor');
const requiredSearchParamsInterceptor = require('./plugins/required-search-params-interceptor');

const app = new Koa();
const router = new Router();

router.get('/clearAll',
  requiredSearchParamsInterceptor('secret'),
  jsonResponse, appSecretInterceptor, clearAll);

router.get('/wxShare', javascriptResponse, wxShare);

router.get('/wxAuth',
  requiredSearchParamsInterceptor('redirect_uri'),
  optionalSearchParamsInterceptor('error_uri', (ctx) => ctx.query.redirect_uri),
  wxAuth);

router.get('/wxCodeAuth',
  requiredSearchParamsInterceptor('code', 'redirect_uri'),
  optionalSearchParamsInterceptor('error_uri', (ctx) => ctx.query.redirect_uri),
  authErrorHandler,
  wxCodeAuth);

app.use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(7610);
log('App runs on http://127.0.0.1:7610');
