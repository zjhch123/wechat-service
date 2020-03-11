let server;

before(() => {
  server = require('./app').server;
});

after(() => {
  server.close();
});
