const getJSConfig = require('../utils/js-config');
const getJSWeixin = require('../utils/js-weixin');
const log = require('../utils/log');
const package = require('../package.json');

const errorResponse = '() => {}';
const { whitelist } = package;


const validateUrl = (url) => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  if (!url) {
    return false;
  }
  if (whitelist.filter(item => url.indexOf(item) !== -1).length === 0) {
    return false;
  }
  return true;
};

module.exports = async (ctx, next) => {
  await next();
  ctx.type = 'application/javascript; charset=utf-8';

  const {
    referer: url,
  } = ctx.headers;

  if (!validateUrl(url)) {
    ctx.body = errorResponse;
    return;
  }

  try {
    const jsTemplate = await getJSWeixin();
    const jsconfig = await getJSConfig(url);

    ctx.body = jsTemplate
      .replace('@{ssr_jsconfig}', JSON.stringify(jsconfig));
  } catch (e) {
    log(`[Error] ${e.message}`);
    ctx.body = '';
  }
};
