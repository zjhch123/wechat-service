const { expect } = require('chai');
const sinon = require('sinon');
const getRandomString = require('../../../src/utils/random-string');

describe('random-string.js', () => {
  let mathRandom;

  before(() => {
    mathRandom = sinon.stub(Math, 'random').returns(0.7937802055370504);
  });

  after(() => {
    mathRandom.restore();
  });

  it('should return random string', () => {
    expect(getRandomString()).to.equal('cb352df6fe69');
  });
});
