let server;

before(() => {
  process.env.NODE_ENV = 'development';
  server = require('./app').server;
});

after(() => {
  server.close();
});
