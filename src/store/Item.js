const logger = require('../logger');
const convertTimestamp = require('../utils/date');

class Item {
  constructor ({
    name,
    source,
    validate,
    convert,
    value = null,
    expire = null,
  }) {
    this.name = name;
    this.convert = convert;
    this.validate = validate;
    this.source = source;
    this.value = value;
    this.expire = expire;
  }

  isValid () {
    return this.value !== null && this.expire !== null && Date.now() < this.expire;
  }

  setData (value, expire) {
    this.value = value;
    this.expire = expire;
  }

  clear () {
    this.value = null;
    this.expire = null;
    logger.info(`${this.name} be cleared.`);
  }

  async getValue (...args) {
    if (this.isValid()) {
      logger.info(`${this.name} expire: ${convertTimestamp(this.expire)}`);
      return this.value;
    }

    logger.info(`${this.name} is invalid, restoring...`);
    const rawData = await this.source(...args);

    await this.validate(rawData);

    const {
      value,
      expire,
    } = await this.convert(rawData);

    this.setData(value, expire);
    return this.value;
  }
}

module.exports = Item;
