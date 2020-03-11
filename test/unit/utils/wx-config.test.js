const { expect } = require('chai');
const sinon = require('sinon');
const getWXConfig = require('../../../src/utils/wx-config');
const { mockAppId } = require('../../test-util');

describe('wx-config.js', () => {
  let mockMathRandom;
  let mockDateNow;

  const mockTimestamp = 1582883984472;

  before(() => {
    mockMathRandom = sinon.stub(Math, 'random').returns(0.1415926);
    mockDateNow = sinon.stub(Date, 'now').returns(mockTimestamp);
  });

  after(() => {
    mockMathRandom.restore();
    mockDateNow.restore();
  });

  it('should get wx config', () => {
    const wxConfig = getWXConfig('fasghfjas321rhkdfqhuw3h', 'http://www.baidu.com');

    expect(wxConfig).to.eql({
      appId: mockAppId,
      timestamp: mockTimestamp,
      nonceStr: '243f69a25b093c',
      signature: 'fffd4c34d8bf6671cf3fa36cf823166223787e24',
    });
  });
});
