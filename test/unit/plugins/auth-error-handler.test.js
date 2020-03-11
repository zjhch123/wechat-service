const { expect } = require('chai');
const { mockContext } = require('../../test-util');
const WechatError = require('../../../src/errors/wechat-error');
const authErrorHandler = require('../../../src/plugins/auth-error-handler');

describe('auth-error-handler.js', () => {
  it('should pass', async () => {
    const { ctx, next } = mockContext({ status: 200 }, () => Promise.resolve());
    await authErrorHandler(ctx, next);
    expect(ctx.status, 'status').to.equal(200);
  });

  it('should be intercepted with WechatError', async () => {
    let redirect = null;

    const error = new WechatError(11440, 'Invalid');

    const { ctx, next } = mockContext({
      status: 200,
      request: {
        query: {
          error_uri: 'http://www.baidu.com',
        },
      },
      redirect: (url) => { redirect = url; },
    }, () => Promise.reject(error));

    let pass = true;

    try {
      await authErrorHandler(ctx, next);
    } catch (e) {
      pass = false;
      expect(e.errcode, 'e.errcode').to.equal(11440);
      expect(e.errmsg, 'e.errmsg').to.equal('Invalid');
      expect(ctx.status, 'ctx.status').to.equal(302);
      expect(redirect).to.equal(`http://www.baidu.com/?errcode=${e.errcode}&errmsg=${e.errmsg}`);
      expect(e, 'error').to.eql(error);
    }

    expect(pass).to.equal(false);
  });

  it('should be intercepted with Error', async () => {
    let redirect = null;

    const error = new Error('Invalid error');

    const { ctx, next } = mockContext({
      status: 200,
      request: {
        query: {
          error_uri: 'http://www.baidu.com',
        },
      },
      redirect: (url) => { redirect = url; },
    }, () => Promise.reject(error));

    let pass = true;

    try {
      await authErrorHandler(ctx, next);
    } catch (e) {
      pass = false;
      expect(ctx.status, 'ctx.status').to.equal(302);
      expect(redirect).to.equal('http://www.baidu.com/');
      expect(e, 'error').to.eql(error);
    }

    expect(pass).to.equal(false);
  });
});
