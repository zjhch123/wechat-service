const { expect } = require('chai');
const { mockSuccessCode, mockOpenId, mockAuthToken } = require('../../test-util');
const { request } = require('../app');

describe('wx-code-auth.js', () => {
  it('should return successful response', async () => {
    const response = await request.get(`/wxCodeAuth?code=${mockSuccessCode}&redirect_uri=http%3A%2F%2F127.0.0.1:7610&postdata_uri=https%3A%2F%2Fstatic.hduzplus.xyz`);
    expect(response.status).to.equal(302);
    expect(response.header.location).to.equal(`http://127.0.0.1:7610/?openid=${mockOpenId}&access_token=${mockAuthToken}`);
  });

  it('should return error if missing params', async () => {
    const response = await request.get('/wxCodeAuth');
    expect(response.status).to.equal(400);
    expect(response.text).to.equal('Missing params: code, redirect_uri, postdata_uri');
  });
});
