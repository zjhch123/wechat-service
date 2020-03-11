const { expect } = require('chai');
const sinon = require('sinon');
const convertTimestamp = require('../../../src/utils/date');
const { mockNow } = require('../../test-util');

describe('date.js', () => {
  before(() => {
    sinon.stub(Date, 'now').returns(mockNow * 1000);
  });

  after(() => {
    Date.now.restore();
  });

  it('should get UTC time', () => {
    expect(convertTimestamp(mockNow * 1000), 'has args').to.equal('2020-03-09 13:03:12.000');
    expect(convertTimestamp(), 'no args').to.equal('2020-03-09 13:03:12.000');
  });
});
