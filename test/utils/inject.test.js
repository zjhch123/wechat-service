const { expect } = require('chai');
const inject = require('../../src/utils/inject');

describe('inject.js', () => {
  it('should inject string', () => {
    expect(inject('const a = @{b}', '@{b}', '12345', false), 'inject string').to.equal('const a = 12345');
  });

  it('should inject object', () => {
    const obj = {
      name: 'jiahao',
    };

    expect(inject('const a = @{b}', '@{b}', obj, true), 'inject json').to.equal('const a = {"name":"jiahao"}');
  });
});
