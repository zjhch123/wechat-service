const fetch = require('node-fetch');

const getAccessToken = require('./access-token');
const store = require('../store');

const name = 'JSTicket';

store.register({
  name,
  source: () => getAccessToken().then(accessToken => {
    return fetch(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`).then(data => data.json());
  }),
  validate: ({ errcode, errmsg }) => {
    if (errcode !== 0) { throw new Error(errmsg); }
  },
  convert: ({ ticket, expires_in }) => ({
    value: ticket,
    expire: Date.now() + expires_in * 1000,
  }),
});

module.exports = function getJSTicket () {
  return store.getValue(name);
};
