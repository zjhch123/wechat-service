const sinon = require('sinon');
const fs = require('fs');
const paths = require('../src/utils/paths');
const { mockAppId, mockAppSecret } = require('./test-util');

before(() => {
  sinon.stub(fs, 'readFileSync')
    .withArgs(paths.appId)
    .returns(mockAppId);
  fs.readFileSync
    .withArgs(paths.appSecret)
    .returns(mockAppSecret);

  fs.readFileSync.callThrough();
});

after(() => {
  fs.readFileSync.restore();
});
