const { expect } = require('chai');
const { mockAppId } = require('../../test-util');
const { request } = require('../app');

describe('wx-auth.js', () => {
  it('should redirect to wechat auth page', async () => {
    const response = await request.get('/wxAuth?redirect_uri=https%3A%2F%2Fwww.baidu.com');
    expect(response.status).to.equal(302);
    expect(response.header.location).to.equal(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${mockAppId}&redirect_uri=http%3A%2F%2F127.0.0.1%3A7610%2FwxCodeAuth%3Fredirect_uri%3Dhttps%25253A%25252F%25252Fwww.baidu.com%26error_uri%3Dhttps%25253A%25252F%25252Fwww.baidu.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`);
  });

  it('should return error if missing params', async () => {
    const response = await request.get('/wxAuth');
    expect(response.status).to.equal(400);
    expect(response.text).to.equal('Missing params: redirect_uri');
  });

  it('should support set custom error_uri', async () => {
    const response = await request.get('/wxAuth?redirect_uri=https%3A%2F%2Fwww.baidu.com&error_uri=http%3A%2F%2Fwww.error.com');
    expect(response.status).to.equal(302);
    expect(response.header.location).to.equal(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${mockAppId}&redirect_uri=http%3A%2F%2F127.0.0.1%3A7610%2FwxCodeAuth%3Fredirect_uri%3Dhttps%25253A%25252F%25252Fwww.baidu.com%26error_uri%3Dhttp%25253A%25252F%25252Fwww.error.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`);
  });
});
