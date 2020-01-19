const fetch = require('node-fetch');
const fs = require('fs');

const log = require('./log');
const paths = require('./paths');
const package = require('../package.json');
const convertTimestamp = require('./date');
const { SSR_WX_JS } = require('../constants');

const { wechatJSURL } = package;

const template = fs.readFileSync(paths.wxShareTemplate).toString();

const jsWeixin = {
  value: null,
  expire: null,
};

const getFromServer = () => fetch(wechatJSURL)
  .then(data => data.text())
  .then(data => {
    jsWeixin.value = template.replace(SSR_WX_JS, data);
    jsWeixin.expire = Date.now() + 24 * 60 * 60 * 1000;
    
    return jsWeixin.value;
  });

module.exports = function getJSWeixin () {
  if (jsWeixin.value !== null && jsWeixin.expire !== null && Date.now() < jsWeixin.expire) {
    log(`Weixin-template expire: ${convertTimestamp(jsWeixin.expire)}`);
    return jsWeixin.value;
  }

  return getFromServer();
};