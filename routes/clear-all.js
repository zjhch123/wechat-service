const store = require('../store');

module.exports = async function clearAll (ctx, next) {
  await next();
  store.clearAll();

  ctx.body = {
    code: 200,
    msg: 'success',
  };
};
