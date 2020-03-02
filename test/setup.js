const constants = require('../src/constants');
const { mockAppId, mockAppSecret } = require('./test-util');

const originalAppId = constants.APP_ID;
const originalAppSecret = constants.APP_SECRET;

before(() => {
  constants.APP_ID = mockAppId;
  constants.APP_SECRET = mockAppSecret;
});

after(() => {
  constants.APP_ID = originalAppId;
  constants.APP_SECRET = originalAppSecret;
});
