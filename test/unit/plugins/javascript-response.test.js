const { expect } = require('chai');
const { mockContext } = require('../../test-util');
const { JAVASCRIPT_CONTENT_TYPE } = require('../../../src/constants');
const javascriptResponse = require('../../../src/plugins/javascript-response');

describe('javascript-response.js', () => {
  it('should change ctx.type and ctx.body', async () => {
    const { ctx, next } = mockContext();
    await javascriptResponse(ctx, next);
    expect(ctx.type, 'type').to.equal(JAVASCRIPT_CONTENT_TYPE);
    expect(ctx.body, 'body').to.equal('');
  });
});
