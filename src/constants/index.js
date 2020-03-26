const package = require('../../package.json');

const IS_DEV = process.env.NODE_ENV === 'development';

const config = require(IS_DEV ? '../../config/dev' : '../../config/prod');

const SSR_PLACEHOLDER = name => `@{ssr_${name}}`;

module.exports = {
  APP_ID: config.appid,
  APP_SECRET: config.appsecret,
  SSR_WX_JS: SSR_PLACEHOLDER('wxJS'),
  SSR_JS_CONFIG: SSR_PLACEHOLDER('jsConfig'),
  JAVASCRIPT_CONTENT_TYPE: 'application/javascript; charset=utf-8',
  JSON_CONTENT_TYPE: 'application/json; charset=utf-8',
  IS_DEV,
  PACKAGE: package,
  config,
};
