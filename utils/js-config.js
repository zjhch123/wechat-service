const fs = require('fs');
const sha1 = require('js-sha1');
const paths = require('./paths');
const log = require('./log');

const getAccessToken = require('./access-token');
const getJSTicket = require('./js-ticket');

const appId = fs.readFileSync(paths.appId).toString();
const appSecret = fs.readFileSync(paths.appSecret).toString();

log(`AppId: ${appId}, AppSecret: ${appSecret}`);

module.exports = async (url) => {
  const accessToken = await getAccessToken(appId, appSecret);
  const jsTicket = await getJSTicket(accessToken);
  const nonceStr = Math.random().toString(16).substr(2);
  const timestamp = Date.now();

  const text = `jsapi_ticket=${jsTicket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
  const signature = sha1(text).toString();

  log(`Accept: ${text}, signature: ${signature}`);

  return {
    appId,
    timestamp,
    nonceStr,
    signature,
  };
};