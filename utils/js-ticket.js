const fetch = require('node-fetch');
const log = require('./log');

const jsTicket = {
  value: null,
  expire: null,
};

const getFromServer = (accessToken) => fetch(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`)
  .then(data => data.json())
  .then(data => {
    if (data.errcode !== 0) {
      throw new Error(data.errmsg);
    }

    const { ticket, expires_in } = data;
    jsTicket.value = ticket;
    jsTicket.expire = Date.now() + expires_in * 1000 * 0.9;

    return ticket;
  });

module.exports = function getJSTicket (accessToken) {
  if (jsTicket.value !== null && jsTicket.expire !== null && Date.now() < jsTicket.expire) {
    log(`js-ticket expire: ${jsTicket.expire}`);
    return jsTicket.value;
  }

  return getFromServer(accessToken);
};