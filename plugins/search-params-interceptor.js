module.exports = function searchParamsInterceptor (...params) {
  return async (ctx, next) => {
    const query = ctx.request.query;
    const missing = [];

    for (let i = 0; i < params.length; i++) {
      const param = params[i];
      if (!(param in query) || query[param] === null) {
        missing.push(param);
      }
    }

    if (missing.length !== 0) {
      ctx.status = 400;
      ctx.body = `Missing params: ${missing.join(', ')}`;
      return;
    }

    await next();
  };
};
