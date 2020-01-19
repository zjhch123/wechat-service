const getJSConfig = require('../utils/js-config');
const getJSWeixin = require('../utils/js-weixin');
const getJSShare = require('../utils/js-share');

module.exports = async (ctx, next) => {
  await next();

  const {
    referer: url,
  } = ctx.headers;

  const jsconfig = await getJSConfig(url);
  const jsWeixinTemplate = await getJSWeixin();
  const jsShareTemplate = getJSShare(jsconfig);

  ctx.body = `${jsWeixinTemplate}\n\n${jsShareTemplate}`;
};
