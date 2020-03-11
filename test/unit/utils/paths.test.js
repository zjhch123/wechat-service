const { expect } = require('chai');
const paths = require('../../../src/utils/paths');

describe('path.js', () => {
  it('should export object', () => {
    expect(Object.prototype.toString.call(paths)).to.equal('[object Object]');
  });

  it('should contain paths', () => {
    expect('appId' in paths, 'appId').to.equal(true);
    expect('appSecret' in paths, 'appSecret').to.equal(true);
    expect('wxJSTemplate' in paths, 'wxJSTemplate').to.equal(true);
    expect('wxShareTemplate' in paths, 'wxShareTemplate').to.equal(true);
  });

  it('should contain correct paths', () => {
    expect(paths.appId.endsWith('appid.dev'), 'appid').to.equal(true);
    expect(paths.appSecret.endsWith('appsecret.dev'), 'appsecret').to.equal(true);
    expect(paths.wxJSTemplate.endsWith('wxJS.tjs'), 'wxJS.tjs').to.equal(true);
    expect(paths.wxShareTemplate.endsWith('wxShare.tjs'), 'wxShare.tjs').to.equal(true);
  });
});
