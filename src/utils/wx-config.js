const sha1 = require('js-sha1');
const logger = require('../logger');
const getRandomString = require('./random-string');
const { APP_ID } = require('../constants');

const buildText = ({ jsTicket, nonceStr, timestamp, url }) =>
  `jsapi_ticket=${jsTicket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;

module.exports = function getWXConfig (jsTicket, url) {
  const nonceStr = getRandomString();
  const timestamp = Date.now();

  const text = buildText({ jsTicket, nonceStr, timestamp, url });
  const signature = sha1(text).toString();

  logger.info(`Accept: ${text}, signature: ${signature}`);

  return {
    appId: APP_ID,
    timestamp,
    nonceStr,
    signature,
  };
};
