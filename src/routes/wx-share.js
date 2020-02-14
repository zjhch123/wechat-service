const getWXConfig = require('../utils/wx-config');
const getJSTicket = require('../models/js-ticket');
const getWXScript = require('../models/wx-script');
const getShareScript = require('../models/share-script');
const combineScripts = require('../utils/combine-scripts');
const javascriptResponse = require('../plugins/javascript-response');

async function wxShare (ctx, next) {
  await next();

  const {
    referer: url,
  } = ctx.headers;

  const jsTicket = await getJSTicket();
  const wxScript = await getWXScript();
  const wxConfig = getWXConfig(jsTicket, url);
  const shareScript = await getShareScript(wxConfig);

  ctx.body = combineScripts(wxScript, shareScript);
}

module.exports = {
  type: 'get',
  path: '/wxShare',
  middleware: [
    javascriptResponse,
    wxShare,
  ],
};
