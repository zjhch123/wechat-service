const { expect } = require('chai');
const sinon = require('sinon');
const { mockContext } = require('../../test-util');
const { auth: { postdataURI } } = require('../../../config/dev');
const optionalSearchParamsInterceptor = require('../../../src/plugins/postdata-uri-whitelist-interceptor');

describe('postdata-uri-whitelist-interceptor.js', () => {
  it('should pass if postdata_uri is postdataURI', async () => {
    const { ctx } = mockContext({
      request: {
        query: {
          postdata_uri: postdataURI,
        },
      },
    });
    const spyNext = sinon.spy();
    await optionalSearchParamsInterceptor(ctx, spyNext);
    expect(spyNext.calledOnce).to.equal(true);
  });

  it('should pass if the host of postdata_uri is in whitelist', async () => {
    const { ctx } = mockContext({
      request: {
        query: {
          postdata_uri: 'http://static.hduzplus.xyz/a/b/c?a=1&b=2',
        },
      },
    });
    const spyNext = sinon.spy();
    await optionalSearchParamsInterceptor(ctx, spyNext);
    expect(spyNext.calledOnce).to.equal(true);
  });

  it('should pass if the host of postdata_uri is in default white list', async () => {
    const { ctx } = mockContext({
      request: {
        query: {
          postdata_uri: 'http://127.0.0.1:8038/a/b/c?a=1',
        },
      },
    });

    const spyNext = sinon.spy();
    await optionalSearchParamsInterceptor(ctx, spyNext);
    expect(spyNext.calledOnce).to.equal(true);
  });

  it('should throw error if the host of postdata_uri is not in white list', async () => {
    const { ctx } = mockContext({
      request: {
        query: {
          postdata_uri: 'http://www.baidu.com',
        },
      },
    });

    const spyNext = sinon.spy();
    let hasError = false;

    try {
      await optionalSearchParamsInterceptor(ctx, spyNext);
    } catch (e) {
      expect(e.message, 'error message').to.equal('Invalid postdata_uri');
      hasError = true;
    }

    expect(hasError, 'has error').to.equal(true);
    expect(spyNext.calledOnce).to.equal(false);
  });
});
