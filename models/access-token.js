const fetch = require('node-fetch');

const WechatError = require('../errors/wechat-error');
const store = require('../store');
const { APP_ID, APP_SECRET } = require('../constants');

const name = 'AccessToken';

store.register({
  name,
  source: () => fetch(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APP_ID}&secret=${APP_SECRET}`).then(data => data.json()),
  validate: ({ errcode, errmsg }) => {
    if (errcode) throw new WechatError(errcode, errmsg);
  },
  convert: ({ access_token, expires_in }) => ({
    value: access_token,
    expire: Date.now() + expires_in * 1000,
  }),
});

module.exports = function getAccessToken () {
  return store.getValue(name);
};
