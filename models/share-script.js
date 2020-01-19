const fs = require('fs');

const paths = require('../utils/paths');
const inject = require('../utils/inject');
const store = require('../store');
const { SSR_JS_CONFIG } = require('../constants');

const name = 'ShareScript';

store.register({
  name,
  source: () => Promise.resolve().then(() => fs.readFileSync(paths.wxShareTemplate).toString()),
  convert: value => ({
    value,
    expire: Date.now() + 24 * 60 * 60 * 1000,
  }),
});

module.exports = function getShareScript (wxConfig) {
  return store.getValue(name).then(script => inject(script, SSR_JS_CONFIG, wxConfig, true));
};
