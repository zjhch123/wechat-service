const { expect } = require('chai');
const { mockAppSecret } = require('../../test-util');
const { request } = require('../app');
const { JSON_CONTENT_TYPE } = require('../../../src/constants');

describe('clear-all.js', () => {
  it('should return successful response', async () => {
    const response = await request.get(`/clearAll?secret=${mockAppSecret}`);
    expect(response.status).to.equal(200);
    expect(response.header['content-type']).to.equal(JSON_CONTENT_TYPE);
    expect(response.body).to.eql({
      code: 200,
      msg: 'success',
    });
  });

  it('should return error if missing params', async () => {
    const response = await request.get('/clearAll');
    expect(response.status).to.equal(400);
    expect(response.text).to.equal('Missing params: secret');
  });

  it('should return error if app secret is wrong', async () => {
    const response = await request.get('/clearAll?secret=123456');
    expect(response.status).to.equal(401);
    expect(response.body).to.eql({
      code: 401,
      msg: 'Invalid app secret: 123456',
    });
  });
});
