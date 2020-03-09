const { expect } = require('chai');
const { mockContext } = require('../test-util');
const requiredSearchParamsInterceptor = require('../../src/plugins/required-search-params-interceptor');

describe('required-search-params-interceptor.js', () => {
  const params = ['name', 'age', 'birth'];

  it('should pass', async () => {
    const { ctx, next } = mockContext({
      status: 200,
      body: 'success',
      request: {
        query: {
          name: 1,
          age: 2,
          birth: 3,
        },
      },
    });

    await (requiredSearchParamsInterceptor(...params))(ctx, next);

    expect(ctx.status).to.equal(200);
    expect(ctx.body).to.equal('success');
  });

  it('should be intercepted', async () => {
    const { ctx, next } = mockContext({
      request: {
        query: {},
      },
    });

    await (requiredSearchParamsInterceptor(...params))(ctx, next);

    expect(ctx.status).to.equal(400);
    expect(ctx.body).to.equal(`Missing params: ${params.join(', ')}`);
  });
});
