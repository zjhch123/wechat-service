const { expect } = require('chai');
const store = require('../../src/store');
const {
  mockSource,
  mockValidate,
  mockConvert,
} = require('../test-util');

describe('store.js', () => {
  beforeEach(() => {
    store.clearAll();
    expect(store.registors, 'registors').to.eql({});
  });

  it('should be empty', async () => {
    expect((await store.getValue('testData'))).to.equal(undefined);
  });

  it('should register without validate', async () => {
    store.register({
      name: 'testData',
      convert: mockConvert,
      source: mockSource,
    });

    let value = await store.getValue('testData', 12345);
    expect(value, 'value').to.equal(12345);

    store.remove('testData');

    value = await store.getValue('testData');
    expect(value, 'value after remove').to.equal(undefined);
  });

  it('should register with args', async () => {
    store.register({
      name: 'testData',
      validate: mockValidate,
      convert: mockConvert,
      source: mockSource,
    });

    let value = await store.getValue('testData', 12345);
    expect(value, 'value').to.equal(12345);

    store.remove('testData');

    value = await store.getValue('testData');
    expect(value, 'value after remove').to.equal(undefined);
  });
});
