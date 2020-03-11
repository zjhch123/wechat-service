const supertest = require('supertest');
const proxyquire = require('proxyquire');
const { mockFetch } = require('../test-util');

mockFetch['@global'] = true;

process.env.NODE_ENV = 'development';

const server = proxyquire('../../src/index', {
  'node-fetch': mockFetch,
});

const request = supertest(server);

module.exports = {
  request,
  server,
};
