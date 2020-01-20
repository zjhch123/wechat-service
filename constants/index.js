const fs = require('fs');
const paths = require('../utils/paths');

const SSR_PLACEHOLDER = name => `@{ssr_${name}}`;

const APP_ID = fs.readFileSync(paths.appId).toString();
const APP_SECRET = fs.readFileSync(paths.appSecret).toString();

module.exports = {
  SSR_WX_JS: SSR_PLACEHOLDER('wxJS'),
  SSR_JS_CONFIG: SSR_PLACEHOLDER('jsConfig'),
  JAVASCRIPT_CONTENT_TYPE: 'application/javascript; charset=utf-8',
  JSON_CONTENT_TYPE: 'application/json; charset=utf-8',
  APP_ID,
  APP_SECRET,
};
