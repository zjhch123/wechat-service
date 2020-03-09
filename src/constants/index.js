const fs = require('fs');
const paths = require('../utils/paths');
const package = require('../../package.json');

const SSR_PLACEHOLDER = name => `@{ssr_${name}}`;
const IS_DEV = process.env.NODE_ENV === 'development';

let APP_ID;
let APP_SECRET;

try {
  APP_ID = IS_DEV ? 'wx06f30708fbccb63e' : fs.readFileSync(paths.appId).toString();
  APP_SECRET = IS_DEV ? '285f895ac9dd49973d36ad0c8704dfb1' : fs.readFileSync(paths.appSecret).toString();
} catch (e) {
  APP_ID = '';
  APP_SECRET = '';
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
