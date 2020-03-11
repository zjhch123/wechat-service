const { expect } = require('chai');
const buildURI = require('../../../src/utils/build-uri');

describe('build-uri.js', () => {
  it('should return correct scripts', () => {
    process.env.NODE_ENV = 'development';
    expect(buildURI(null, '/a/b/c', { test: 1, age: 2, name: 3 }), 'development')
      .to.equal('http://127.0.0.1:7610/a/b/c?test=1&age=2&name=3');

    process.env.NODE_ENV = 'production';
    expect(buildURI('http://www.baidu.com', '/d/e/f', { name: 1, age: 2, test: 3 }), 'production')
      .to.equal('http://www.baidu.com/d/e/f?name=1&age=2&test=3');
  });
});
