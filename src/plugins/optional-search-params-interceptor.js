const isFunction = require('../utils/is-function');

module.exports = function optionalSearchParamsInterceptor (paramsName, defaultValue = '') {
  return async (ctx, next) => {
    const query = ctx.request.query;
    let getDefaultValue = () => defaultValue;

    if (isFunction(defaultValue)) {
      getDefaultValue = () => defaultValue(ctx);
    }

    if (!(paramsName in query)) {
      query[paramsName] = getDefaultValue();
    }

    await next();
  };
};
