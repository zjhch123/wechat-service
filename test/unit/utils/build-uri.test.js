const { expect } = require('chai');
const buildURI = require('../../../src/utils/build-uri');

describe('build-uri.js', () => {
  it('should return correct scripts', () => {
    expect(buildURI('http://www.baidu.com', '/d/e/f', { name: 1, age: 2, test: 3 }), 'production')
      .to.equal('http://www.baidu.com/d/e/f?name=1&age=2&test=3');

    expect(buildURI('http://www.baidu.com/d/e/f', '', { name: 1, age: 2, test: 3 }), 'production')
      .to.equal('http://www.baidu.com/d/e/f?name=1&age=2&test=3');
  });
});
