const getJSConfig = require('../utils/js-config');
const getJSWeixin = require('../utils/js-weixin');
const log = require('../utils/log');
const validateUrl = require('../utils/validateUrl');
const { SSR_JS_CONFIG, JAVASCRIPT_CONTENT_TYPE } = require('../constants');

module.exports = async (ctx, next) => {
  await next();
  ctx.type = JAVASCRIPT_CONTENT_TYPE;
  ctx.body = '';

  const {
    referer: url,
  } = ctx.headers;

  if (!validateUrl(url)) {
    log(`[Error] Invalid url: ${url}`);
    return;
  }

  try {
    const jsTemplate = await getJSWeixin();
    const jsconfig = await getJSConfig(url);

    ctx.body = jsTemplate
      .replace(SSR_JS_CONFIG, JSON.stringify(jsconfig));
  } catch (e) {
    log(`[Error] ${e.message}`);
  }
};
