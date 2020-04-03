const { expect } = require('chai');
const { mockContext } = require('../../test-util');
const authServicesInterceptor = require('../../../src/plugins/auth-services-interceptor');

describe('error-handler.js', () => {
  it('should pass', async () => {
    let hasError = false;
    try {
      const { ctx, next } = mockContext({
        request: {
          query: {
            service_id: 'dev',
          },
        },
      }, () => Promise.resolve());
      await authServicesInterceptor(ctx, next);
    } catch (e) {
      hasError = true;
    }
    expect(hasError, 'should not throw any errors').to.equal(false);
  });

  it('should be intercepted', async () => {
    let hasError = false;
    try {
      const { ctx, next } = mockContext({
        request: {
          query: {
            service_id: 'invalid',
          },
        },
      }, () => Promise.resolve());
      await authServicesInterceptor(ctx, next);
    } catch (e) {
      hasError = true;
      expect(e.message, 'error message').to.equal('Invalid auth service id');
    }
    expect(hasError, 'should throw errors').to.equal(true);
  });
});
