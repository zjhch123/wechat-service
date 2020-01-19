const getWXScript = require('../models/wx-script');
const getShareScript = require('../models/share-script');
const getWXConfig = require('../utils/wx-config');
const combineScripts = require('../utils/combine-scripts');

const getJSTicket = require('../models/js-ticket');

module.exports = async (ctx, next) => {
  await next();

  const {
    referer: url,
  } = ctx.headers;

  const jsTicket = await getJSTicket();
  const wxScript = await getWXScript();
  const wxConfig = getWXConfig(jsTicket, url);
  const shareScript = await getShareScript(wxConfig);

  ctx.body = combineScripts(wxScript, shareScript);
};
