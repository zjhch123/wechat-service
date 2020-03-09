const fetch = require('node-fetch');
const WechatError = require('../errors/wechat-error');
const { APP_ID, APP_SECRET, JSON_CONTENT_TYPE } = require('../constants');

async function getAuthAccessToken (code) {
  return fetch(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APP_ID}&secret=${APP_SECRET}&code=${code}&grant_type=authorization_code`)
    .then(data => data.json())
    .then(({ errcode, errmsg, access_token, expires_in, refresh_token, openid }) => {
      if (errcode) { throw new WechatError(errcode, errmsg); }

      return {
        authAccessToken: access_token,
        authRefreshToken: refresh_token,
        openId: openid,
        expire: Date.now() + expires_in * 1000,
      };
    });
}

async function getUserInfo (code) {
  const {
    authAccessToken,
    openId,
  } = await getAuthAccessToken(code);

  return fetch(`https://api.weixin.qq.com/sns/userinfo?access_token=${authAccessToken}&openid=${openId}&lang=zh_CN`)
    .then(data => data.json())
    .then(({ errcode, errmsg, ...userInfo }) => {
      if (errcode) { throw new WechatError(errcode, errmsg); }

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
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response;
  }).catch((e) => { throw new Error(`Remote server error. - \n ${e.message}`); });
}

module.exports = {
  getUserInfo,
  postUserInfo,
};