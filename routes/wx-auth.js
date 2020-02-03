const { URL } = require('url');
const { APP_ID } = require('../constants');
const { serverURL } = require('../package.json');

const buildServerRedirectURI = (searchParams) => {
  const baseHost = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7610' : serverURL;
  const serverRedirectURI = new URL('/wxCodeAuth', baseHost);

  Object.keys(searchParams).forEach(param =>
    serverRedirectURI.searchParams.append(param, encodeURIComponent(searchParams[param])));

  return encodeURIComponent(serverRedirectURI.toString());
};

module.exports = async function wxAuth (ctx, next) {
  await next();
  const {
    redirect_uri, // TODO: Will add logic of verifying the domain
    postdata_uri,
    error_uri,
  } = ctx.request.query;

  const serverRedirectURI = buildServerRedirectURI({
    redirect_uri,
    postdata_uri,
    error_uri,
  });

  ctx.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${serverRedirectURI}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`);
};
