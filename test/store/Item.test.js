const { expect } = require('chai');
const sinon = require('sinon');
const Item = require('../../src/store/Item');

describe('Item.js', () => {
  const mockExpireDate = Date.now() + 9999999;
  const getItem = ({
    name = 'mock item',
    source = Promise.resolve(),
    validate = Promise.resolve(),
    convert = Promise.resolve(),
    value = null,
    expire = null,
  } = {}) => {
    return new Item({
      name,
      source,
      validate,
      convert,
      value,
      expire,
    });
  };

  const mockSource = (value) => new Promise((resolve, reject) => {
    resolve({
      id: 1,
      value,
      expire: mockExpireDate,
      isValid: true,
    });
  });

  const mockValidate = (rawData) => new Promise((resolve) => {
    resolve(rawData.isValid);
  });

  const mockConvert = (rawData) => new Promise((resolve) => {
    resolve({ value: rawData.value, expire: rawData.expire });
  });

  it('should return isValid', () => {
    const expire = mockExpireDate;
    const item = getItem({ value: 123, expire });

    expect(item.isValid()).to.equal(true);

    item.setData(123, null);
    expect(item.isValid(), 'expire is null').to.equal(false);

    item.setData(null, expire);
    expect(item.isValid(), 'value is null').to.equal(false);

    item.setData(123, Date.now() - 99999);
    expect(item.isValid(), 'expired').to.equal(false);
  });

  it('should clear', () => {
    const expire = mockExpireDate;
    const item = getItem({
      value: 123,
      expire: expire,
    });

    expect(item.value).to.equal(123);
    expect(item.expire).to.equal(expire);
    expect(item.isValid()).to.equal(true);

    item.clear();

    expect(item.value).to.equal(null);
    expect(item.expire).to.equal(null);
    expect(item.isValid()).to.equal(false);
  });

  it('should getValue', async () => {
    const item = getItem({
      source: mockSource,
      validate: mockValidate,
      convert: mockConvert,
    });
    const value = 999876;
    const value2 = 12345;

    const spySource = sinon.spy(item, 'source');
    const spyValidate = sinon.spy(item, 'validate');
    const spyConvert = sinon.spy(item, 'convert');

    expect(item.value, 'value').to.equal(null);
    expect(item.expire, 'expire').to.equal(null);
    expect(item.isValid(), 'isValid').to.equal(false);

    const itemValue = await item.getValue(value);
    expect(itemValue, 'after get value').to.equal(value);
    expect(item.value, 'after get value item.value').to.equal(value);
    expect(item.expire, 'after get value item.expire').to.equal(mockExpireDate);

    expect(spySource.callCount, 'spySource - 1').to.equal(1);
    expect(spyValidate.callCount, 'spyValidate - 1').to.equal(1);
    expect(spyConvert.callCount, 'spyConvert - 1').to.equal(1);

    const itemValue2 = await item.getValue(value2);
    expect(itemValue2, 'itemValue2 should equal value').to.equal(value);

    expect(spySource.callCount, 'spySource - 2').to.equal(1);
    expect(spyValidate.callCount, 'spyValidate - 2').to.equal(1);
    expect(spyConvert.callCount, 'spyConvert - 2').to.equal(1);

    item.expire = Date.now() - 99999;
    expect(item.isValid()).to.equal(false);

    const itemValue3 = await item.getValue(value2);
    expect(itemValue3).to.equal(value2);

    expect(spySource.callCount, 'spySource - 3').to.equal(2);
    expect(spyValidate.callCount, 'spyValidate - 3').to.equal(2);
    expect(spyConvert.callCount, 'spyConvert - 3').to.equal(2);
  });
});
