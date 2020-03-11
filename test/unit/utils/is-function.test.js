const { expect } = require('chai');
const isFunction = require('../../../src/utils/is-function');

describe('is-function.js', () => {
  it('should return true', () => {
    const a = () => {};
    expect(isFunction(a), 'array function').to.equal(true);

    function b () {}
    expect(isFunction(b), 'normal function').to.equal(true);

    class c {}
    expect(isFunction(c), 'class').to.equal(true);
  });

  it('should return false', () => {
    [null, undefined, 1, 'string', { a: 1 }].forEach((val, index) => {
      expect(isFunction(val), `index: ${index}`).to.equal(false);
    });
  });
});
