const { expect } = require('chai');
const { mockAppId } = require('../../test-util');
const { request } = require('../app');

describe('wx-auth.js', () => {
  it('should redirect to wechat auth page', async () => {
    const response = await request.get('/wxAuth?redirect_uri=https%3A%2F%2Fwww.baidu.com&postdata_uri=https%3A%2F%2Fstatic.hduzplus.xyz');
    expect(response.status).to.equal(302);
    expect(response.header.location).to.equal(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${mockAppId}&redirect_uri=http%3A%2F%2F127.0.0.1%3A7610%2FwxCodeAuth%3Fpostdata_uri%3Dhttps%253A%252F%252Fstatic.hduzplus.xyz%26redirect_uri%3Dhttps%253A%252F%252Fwww.baidu.com%26error_uri%3Dhttps%253A%252F%252Fwww.baidu.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`);
  });

  it('should support set custom error_uri', async () => {
    const response = await request.get('/wxAuth?redirect_uri=https%3A%2F%2Fwww.baidu.com&error_uri=http%3A%2F%2Fwww.error.com');
    expect(response.status).to.equal(302);
    expect(response.header.location).to.equal(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${mockAppId}&redirect_uri=http%3A%2F%2F127.0.0.1%3A7610%2FwxCodeAuth%3Fredirect_uri%3Dhttps%253A%252F%252Fwww.baidu.com%26error_uri%3Dhttp%253A%252F%252Fwww.error.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`);
  });

  it('should hidden postdata_uri if it is null or equal to postdataURL', async () => {
    const nullPostdataURI = await request.get('/wxAuth?redirect_uri=https%3A%2F%2Fwww.baidu.com&error_uri=http%3A%2F%2Fwww.error.com');
    expect(nullPostdataURI.header.location, 'null').to.equal(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${mockAppId}&redirect_uri=http%3A%2F%2F127.0.0.1%3A7610%2FwxCodeAuth%3Fredirect_uri%3Dhttps%253A%252F%252Fwww.baidu.com%26error_uri%3Dhttp%253A%252F%252Fwww.error.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`);

    const samePostdataURI = await request.get('/wxAuth?redirect_uri=https%3A%2F%2Fwww.baidu.com&error_uri=http%3A%2F%2Fwww.error.com&postdata_uri=https%3A%2F%2Fhttpbin.org%2Fpost');
    expect(samePostdataURI.header.location, 'equal').to.equal(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${mockAppId}&redirect_uri=http%3A%2F%2F127.0.0.1%3A7610%2FwxCodeAuth%3Fredirect_uri%3Dhttps%253A%252F%252Fwww.baidu.com%26error_uri%3Dhttp%253A%252F%252Fwww.error.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`);
  }).timeout(100000);
});
