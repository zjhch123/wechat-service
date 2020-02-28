const { expect } = require('chai');
const combineScripts = require('../../src/utils/combine-scripts');

describe('combine-scripts.js', () => {
  it('should return correct scripts', () => {
    expect(combineScripts('abc', 'def', 'g')).to.equal('abc\n\ndef\n\ng');
    expect(combineScripts('')).to.equal('');
    expect(combineScripts('abcdef')).to.equal('abcdef');
    expect(combineScripts()).to.equal('');
    ['', undefined, null].forEach((value) => {
      expect(combineScripts(value)).to.equal('');
    });
  });
});
