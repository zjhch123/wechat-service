const fetch = require('node-fetch');
const { APP_ID, APP_SECRET, IS_DEV, JSON_CONTENT_TYPE } = require('../constants');

async function getAuthAccessToken (code) {
  return fetch(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APP_ID}&secret=${APP_SECRET}&code=${code}&grant_type=authorization_code`)
    .then(data => data.json())
    .then(({ errcode, errmsg, access_token, expires_in, refresh_token, openid }) => {
      if (errcode) { throw new Error(errmsg); }

      return {
        authAccessToken: access_token,
        authRefreshToken: refresh_token,
        openId: openid,
        expire: Date.now() + expires_in * 1000,
      };
    });
}

async function getUserInfo ({
  authAccessToken,
  openId,
}) {
  return fetch(`https://api.weixin.qq.com/sns/userinfo?access_token=${authAccessToken}&openid=${openId}&lang=zh_CN`)
    .then(data => data.json())
    .then(({ errcode, errmsg, ...userInfo }) => {
      if (errcode) { throw new Error(errmsg); }

      return userInfo;
    });
}

async function postUserInfo (postdataURI, userInfo) {
  return fetch(postdataURI, {
    method: 'POST',
    headers: {
      'Content-Type': JSON_CONTENT_TYPE,
      Source: 'Wechat-Service',
    },
    body: JSON.stringify(userInfo),
    timeout: 5000,
  }).catch((e) => { throw new Error(`Remote server error. - \n ${e.message}`); });
}

module.exports = async function wxCodeAuth (ctx, next) {
  await next();
  const {
    code,
    redirect: redirectURI,
    postdata: postdataURI,
    error: errorURI,
  } = ctx.request.query;

  try {
    const {
      authAccessToken,
      authRefreshToken,
      openId,
      expire,
    } = await getAuthAccessToken(code);

    const userInfo = await getUserInfo({
      authAccessToken,
      openId,
    });

    const userPackage = {
      ...userInfo,
      accessToken: authAccessToken,
      refreshToken: authRefreshToken,
      openId,
      expire,
    };

    if (IS_DEV) {
      await postUserInfo('https://httpbin.org/post', userPackage);
      ctx.body = {
        code: 200,
        data: userPackage,
      };
      return;
    }

    await postUserInfo(decodeURIComponent(postdataURI), userPackage);

    ctx.redirect(decodeURIComponent(redirectURI));
  } catch (e) {
    console.log(e);
    errorURI && ctx.redirect(decodeURIComponent(errorURI));
  }
};
