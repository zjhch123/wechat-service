const { expect } = require('chai');
const sinon = require('sinon');
const { request } = require('../app');
const { mockNow, mockWXScript } = require('../../test-util');
const { JAVASCRIPT_CONTENT_TYPE } = require('../../../src/constants');

describe('wx-share.js', () => {
  before(() => {
    sinon.stub(Date, 'now').returns(mockNow * 1000);
  });

  after(() => {
    Date.now.restore();
  });

  it('should return successful response', async () => {
    const response = await request.get('/wxShare');
    expect(response.status).to.equal(200);
    expect(response.header['content-type']).to.equal(JAVASCRIPT_CONTENT_TYPE);
    expect(response.text.indexOf(mockWXScript) !== -1, 'should return correct script').to.equal(true);
  });
});
