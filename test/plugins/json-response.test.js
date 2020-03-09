const { expect } = require('chai');
const { mockContext } = require('../test-util');
const { JSON_CONTENT_TYPE } = require('../../src/constants');
const jsonResponse = require('../../src/plugins/json-response');

describe('json-response.js', () => {
  it('should change ctx.type and ctx.body', async () => {
    const { ctx, next } = mockContext();

    await jsonResponse(ctx, next);

    expect(ctx.type, 'type').to.equal(JSON_CONTENT_TYPE);
    expect(ctx.body, 'body').to.eql({
      code: 500,
      msg: 'Server error',
    });
  });
});
