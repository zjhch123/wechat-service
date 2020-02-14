const fetch = require('node-fetch');
const fs = require('fs');

const paths = require('../utils/paths');
const inject = require('../utils/inject');
const store = require('../store');
const { SSR_WX_JS, PACKAGE: package } = require('../constants');

const { wechatJSURL } = package;

const name = 'WXScript';

store.register({
  name,
  source: () => fetch(wechatJSURL).then(data => data.text()),
  convert: data => {
    const template = fs.readFileSync(paths.wxJSTemplate).toString();

    return {
      value: inject(template, SSR_WX_JS, data),
      expire: Date.now() + 24 * 60 * 60 * 1000,
    };
  },
});

module.exports = function getWXScript () {
  return store.getValue(name);
};
