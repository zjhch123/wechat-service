const { expect } = require('chai');
const proxyquire = require('proxyquire');
const WechatError = require('../../../src/errors/wechat-error');
const {
  mockFetch,
  mockSuccessCode,
  mockFailedCode,
  mockExpiredCode,
  mockOpenId,
  mockUserInfo,
  mockAuthToken,
} = require('../../test-util');

describe('wx-code-auth-service.js', () => {
  let getUserInfo;
  let postUserInfo;

  beforeEach(() => {
    const dependency = proxyquire('../../../src/services/wx-code-auth-service.js', {
      'node-fetch': mockFetch,
    });

    getUserInfo = dependency.getUserInfo;
    postUserInfo = dependency.postUserInfo;
  });

  describe('getUserInfo', () => {
    it('should get user info from wechat service', async () => {
      const retValue = await getUserInfo(mockSuccessCode);
      expect(retValue).to.eql({
        access_token: mockAuthToken,
        openid: mockOpenId,
        ...mockUserInfo,
      });
    });

    it('should throw error when get access token failed', async () => {
      let hasError = false;
      try {
        await getUserInfo(mockFailedCode);
      } catch (e) {
        hasError = true;
        expect(e instanceof WechatError).to.equal(true);
        expect(e.errcode).to.equal(1441);
        expect(e.errmsg).to.equal('User error');
      }

      expect(hasError, 'should has error').to.equal(true);
    });

    it('should throw error when access token is expired', async () => {
      let hasError = false;
      try {
        await getUserInfo(mockExpiredCode);
      } catch (e) {
        hasError = true;
        expect(e instanceof WechatError).to.equal(true);
        expect(e.errcode).to.equal(1442);
        expect(e.errmsg).to.equal('Token expired');
      }

      expect(hasError, 'should has error').to.equal(true);
    });
  });

  describe('postUserInfo', () => {
    it('should post user info successfully', async () => {
      const response = await postUserInfo('https://httpbin.org/post?success', {});
      expect(response.ok).to.equal(true);
      expect(await response.json()).to.eql({
        code: 200,
      });
    });

    it('should throw error if failed', async () => {
      let hasError = false;
      try {
        await postUserInfo('https://httpbin.org/post?error', {});
      } catch (e) {
        hasError = true;
        expect(e.message).to.equal('Remote server error. - Error');
      }
      expect(hasError, 'should has error').to.equal(true);
    });

    it('should throw if reject', async () => {
      let hasError = false;
      try {
        await postUserInfo('https://httpbin.org/post?serverError', {});
      } catch (e) {
        hasError = true;
        expect(e.message).to.equal('Remote server error. - Server error');
      }
      expect(hasError, 'should has error').to.equal(true);
    });
  });
});
