async function getAuthAccessToken (code) {

}

async function getUserInfo ({
  authAccessToken,
  authRefreshToken,
  openId,
}) {

}

async function postUserInfo (userInfo) {

}

module.exports = async function wxCodeAuth (ctx, next) {
  await next();
  const {
    code,
    redirect,
  } = ctx.request.query;

  const {
    authAccessToken,
    authRefreshToken,
    openId,
    expire,
  } = await getAuthAccessToken(code);

  const userInfo = await getUserInfo({
    authAccessToken,
    authRefreshToken,
    openId,
  });

  await postUserInfo({
    ...userInfo,
    authAccessToken,
    authRefreshToken,
    openId,
    expire,
  });

  ctx.redirect(redirect);
};
