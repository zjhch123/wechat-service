const { expect } = require('chai');
const { mockSuccessCode, mockUserInfo, mockOpenId } = require('../../test-util');
const { request } = require('../app');

describe('wx-code-auth.js', () => {
  it('should return successful response', async () => {
    const response = await request.get(`/wxCodeAuth?code=${mockSuccessCode}&redirect_uri=https%3A%2F%2Fwww.baidu.com`);
    expect(response.status).to.equal(200);
    expect(response.body).to.eql({
      code: 200,
      data: {
        openid: mockOpenId,
        ...mockUserInfo,
      },
    });
  });

  it('should return error if missing params', async () => {
    const response = await request.get('/wxCodeAuth');
    expect(response.status).to.equal(400);
    expect(response.text).to.equal('Missing params: code, redirect_uri');
  });
});
