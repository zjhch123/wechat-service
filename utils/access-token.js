const fetch = require('node-fetch');
const log = require('./log');
const convertTimestamp = require('./date');

const accessToken = {
  value: null,
  expire: null,
};

const getFromServer = (appId, appSecret) => fetch(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`)
  .then(data => data.json())
  .then(data => {
    if (data.errcode) {
      throw new Error(data.errmsg);
    }

    const { access_token, expires_in } = data;
    accessToken.value = access_token;
    accessToken.expire = Date.now() + expires_in * 1000 * 0.9;

    return access_token;
  });

module.exports = function getAccessToken (appId, appSecret) {
  if (accessToken.value !== null && accessToken.expire !== null && Date.now() < accessToken.expire) {
    log(`Access-token expire: ${convertTimestamp(accessToken.expire)}`);
    return accessToken.value;
  }

  return getFromServer(appId, appSecret);
};
