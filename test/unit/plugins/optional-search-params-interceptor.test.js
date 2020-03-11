const { expect } = require('chai');
const { mockContext } = require('../../test-util');
const optionalSearchParamsInterceptor = require('../../../src/plugins/optional-search-params-interceptor');

describe('optional-search-params-interceptor.js', () => {
  it('should handle the defaultValue logic', async () => {
    const { ctx, next } = mockContext({
      request: {
        query: {},
      },
    });

    await (optionalSearchParamsInterceptor('defaultValue'))(ctx, next);
    expect(ctx.request.query.defaultValue, 'default value should be empty string if not set').to.equal('');

    await (optionalSearchParamsInterceptor('test', 12345))(ctx, next);
    expect(ctx.request.query.test, 'set default value').to.equal(12345);

    await (optionalSearchParamsInterceptor('test', 67890))(ctx, next);
    expect(ctx.request.query.test, 'the value should not change if the param has existed').to.equal(12345);

    await (optionalSearchParamsInterceptor('method', () => 'method'))(ctx, next);
    expect(ctx.request.query.method, 'get the value by function').to.equal('method');
  });
});
