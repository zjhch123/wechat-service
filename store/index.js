const Item = require('./Item');

class Store {
  constructor () {
    this.registors = {};
  }

  clearAll () {
    Object.keys(this.registors).forEach(key => {
      this.registors[key].clear();
    });
  }

  register ({
    name,
    source,
    validate,
    convert,
  }) {
    this.registors[name] = new Item({ name, validate, convert, source });
  }

  async getValue (name) {
    const item = this.registors[name];

    if (!item) {
      return undefined;
    }

    const value = await item.getValue();
    return value;
  }

  remove (name) {
    delete this.registors[name];
  }
}

module.exports = new Store();
