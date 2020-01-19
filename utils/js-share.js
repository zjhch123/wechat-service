const fs = require('fs');

const log = require('./log');
const paths = require('./paths');
const convertTimestamp = require('./date');
const { SSR_JS_CONFIG } = require('../constants');

const jsShare = {
  value: null,
  expire: null,
};

const getFromFile = (data) => {
  const content = fs.readFileSync(paths.wxShareTemplate).toString();
  jsShare.value = content.replace(SSR_JS_CONFIG, JSON.stringify(data));
  jsShare.expire = Date.now() + 24 * 60 * 60 * 1000;

  return content;
};

module.exports = function getJSShare (data) {
  if (jsShare.value !== null && jsShare.expire !== null && Date.now() < jsShare.expire) {
    log(`Share-template expire: ${convertTimestamp(jsShare.expire)}`);
    return jsShare.value;
  }

  return getFromFile(data);
};
