const { expect } = require('chai');
const { mockContext } = require('../test-util');
const errorHandler = require('../../src/plugins/error-handler');

describe('error-handler.js', () => {
  it('should pass', async () => {
    const { ctx, next } = mockContext({ status: 200 }, () => Promise.resolve());
    await errorHandler(ctx, next);
    expect(ctx.status, 'status').to.equal(200);
  });

  it('should be intercepted', async () => {
    const error = new Error('error');
    const { ctx, next } = mockContext({ status: 200 }, () => Promise.reject(error));

    await errorHandler(ctx, next);
    expect(ctx.status, 'status').to.equal(400);

    ctx.status = 302;

    await errorHandler(ctx, next);
    expect(ctx.status, 'status').to.equal(302);
  });
});
