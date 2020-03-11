const sinon = require('sinon');
let server;

before(() => {
  sinon.stub(console, 'log').returns('');
  server = require('./app').server;
});

after(() => {
  console.log.restore();
  server.close();
});
