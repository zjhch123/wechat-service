const { expect } = require('chai');
const sinon = require('sinon');
const log = require('../../src/utils/log');

describe('log.js', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    consoleSpy.restore();
  });

  it('should console the message', () => {
    log('test message');
    expect(consoleSpy.called).to.equal(true);
    expect(consoleSpy.lastCall.args[0].endsWith('test message')).to.equal(true);
  });
});
