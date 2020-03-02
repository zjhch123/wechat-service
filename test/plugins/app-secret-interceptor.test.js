const { expect } = require('chai');
const { mockContext, mockAppSecret } = require('../test-util');
const appSecretInterceptor = require('../../src/plugins/app-secret-interceptor');

describe('app-secret-interceptor.js', () => {
  it('should pass', async () => {
    const { ctx, next } = mockContext({
      request: {
        query: {
          secret: mockAppSecret,
        },
      },
      body: {
        code: 200,
      },
    });

    await appSecretInterceptor(ctx, next);
    expect(ctx.body.code).to.equal(200);
  });

  it('should be intercepted', async () => {
    const { ctx, next } = mockContext({
      request: {
        query: {
          secret: '12345',
        },
      },
      body: {
        code: 200,
      },
    });

    let intercepted = false;

    try {
      await appSecretInterceptor(ctx, next);
    } catch (e) {
      const errorMessage = 'Invalid app secret: 12345';
      expect(e.message, 'error message').to.equal(errorMessage);
      expect(ctx.body, 'ctx.body').to.eql({
        code: 401,
        msg: errorMessage,
      });
      intercepted = true;
    }

    expect(intercepted, 'intercepted').to.equal(true);
  });
});
