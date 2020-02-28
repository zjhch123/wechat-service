const { expect } = require('chai');
const sinon = require('sinon');
const convertTimestamp = require('../../src/utils/date');

describe('date.js', () => {
  let mockDate;

  before(() => {
    mockDate = sinon.stub(Date, 'now').returns(1582869663823);
  });

  after(() => {
    mockDate.restore();
  });

  it('should return correct date', () => {
    expect(convertTimestamp(1582869663823), 'with args').to.equal('2020-02-28 14:01:03.823');
    expect(convertTimestamp(), 'without args').to.equal('2020-02-28 14:01:03.823');
  });
});
