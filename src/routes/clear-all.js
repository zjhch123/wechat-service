const jsonResponse = require('../plugins/json-response');
const appSecretInterceptor = require('../plugins/app-secret-interceptor');
const requiredSearchParamsInterceptor = require('../plugins/required-search-params-interceptor');
const store = require('../store');

async function clearAll (ctx, next) {
  await next();
  store.clearAll();

  ctx.body = {
    code: 200,
    msg: 'success',
  };
}

module.exports = {
  type: 'get',
  path: '/clearAll',
  middleware: [
    requiredSearchParamsInterceptor('secret'),
    jsonResponse,
    appSecretInterceptor,
    clearAll,
  ],
};
