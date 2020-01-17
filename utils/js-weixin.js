const fetch = require('node-fetch');
const fs = require('fs');

const log = require('./log');
const paths = require('./paths');

const template = fs.readFileSync(paths.wxShareTemplate).toString();

const jsWeixin = {
  value: null,
  expire: null,
};

const getFromServer = () => fetch(`http://res2.wx.qq.com/open/js/jweixin-1.6.0.js`)
  .then(data => data.text())
  .then(data => {
    jsWeixin.value = template.replace('@{ssr_wxJSFile}', data);
    jsWeixin.expire = Date.now() + 24 * 60 * 60 * 1000;
    
    return jsWeixin.value;
  });

module.exports = function getJSWeixin () {
  if (jsWeixin.value !== null && jsWeixin.expire !== null && Date.now() < jsWeixin.expire) {
    log(`Weixin-template expire: ${jsWeixin.expire}`);
    return jsWeixin.value;
  }

  return getFromServer();
};