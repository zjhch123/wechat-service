const fs = require('fs');
const paths = require('../utils/paths');
const package = require('../../package.json');

const SSR_PLACEHOLDER = name => `@{ssr_${name}}`;
const IS_DEV = process.env.NODE_ENV === 'development';

let APP_ID;
let APP_SECRET;

try {
  APP_ID = fs.readFileSync(paths.appId).toString();
  APP_SECRET = fs.readFileSync(paths.appSecret).toString();
} catch (e) {
  throw new Error(`Please set your appId and appSecret first! \n ${e.message}`);
}

module.exports = {
  SSR_WX_JS: SSR_PLACEHOLDER('wxJS'),
  SSR_JS_CONFIG: SSR_PLACEHOLDER('jsConfig'),
  JAVASCRIPT_CONTENT_TYPE: 'application/javascript; charset=utf-8',
  JSON_CONTENT_TYPE: 'application/json; charset=utf-8',
  APP_ID,
  APP_SECRET,
  IS_DEV,
  PACKAGE: package,
};
