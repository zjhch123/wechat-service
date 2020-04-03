const { config: { auth: { services } } } = require('../constants');

module.exports = async function authServicesInterceptor (ctx, next) {
  const serviceId = decodeURIComponent(ctx.request.query.service_id);

  if (services.filter(({ id }) => serviceId === id).length > 0) {
    await next();
    return;
  }

  throw new Error('Invalid auth service id');
};
