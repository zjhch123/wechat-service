const { APP_ID, APP_SECRET, PACKAGE: package } = require('../src/constants');
const { wechatJSURL } = package;

const mockExpireDate = Date.now() + 999999;

const mockAppId = APP_ID;
const mockAppSecret = APP_SECRET;
const mockSuccessCode = '123456';
const mockFailedCode = '1234567';
const mockExpiredCode = '12345678';
const mockAuthToken = '123abc';
const mockFailedAuthToken = '1234abcd';
const mockRefreshToken = '456abc';
const mockOpenId = '1234abcd';
const mockNow = 1583758992;
const mockUserInfo = {
  nickname: 'Nickname',
  sex: 1,
  language: 'zh_CN',
  city: 'HZ',
  province: 'ZJ',
  country: 'China',
  headimgurl: 'headimgurl',
  privilege: [],
};
const mockAccessToken = '77775555';
const mockJSTicket = '66668888';
const mockWXScript = "console.log('WXShare');";

const mockSource = (value) => new Promise((resolve, reject) => {
  resolve({
    id: 1,
    value,
    expire: mockExpireDate,
    isValid: true,
  });
});

const mockValidate = (rawData) => new Promise((resolve) => {
  resolve(rawData.isValid);
});

const mockConvert = (rawData) => new Promise((resolve) => {
  resolve({ value: rawData.value, expire: rawData.expire });
});

const mockContext = (defaultCtx = {}, defaultNext = () => Promise.resolve()) => {
  return {
    ctx: {
      header: {},
      body: {},
      request: {},
      ...defaultCtx,
    },
    next: defaultNext,
  };
};

const fetchObject = (value, isSuccess = true, isReject = false) => {
  return isReject ? Promise.reject(value) : Promise.resolve().then(() => ({
    json: () => new Promise((resolve, reject) => !isReject ? resolve(value) : reject(value)),
    text: () => new Promise((resolve, reject) => !isReject ? resolve(value) : reject(value)),
    ok: isSuccess,
    status: isSuccess ? 200 : 500,
    statusText: isSuccess ? 'OK' : 'Error',
  }));
};

const mockFetch = (url) => {
  let retValue;

  switch (url) {
    case `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${mockAppId}&secret=${mockAppSecret}&code=${mockSuccessCode}&grant_type=authorization_code`:
      retValue = fetchObject({
        access_token: mockAuthToken,
        expires_in: mockNow,
        refresh_token: mockRefreshToken,
        openid: mockOpenId,
      });
      break;
    case `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${mockAppId}&secret=${mockAppSecret}&code=${mockFailedCode}&grant_type=authorization_code`:
      retValue = fetchObject({
        errcode: 1441,
        errmsg: 'User error',
      });
      break;
    case `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${mockAppId}&secret=${mockAppSecret}&code=${mockExpiredCode}&grant_type=authorization_code`:
      retValue = fetchObject({
        access_token: mockFailedAuthToken,
        expires_in: mockNow,
        refresh_token: mockRefreshToken,
        openid: mockOpenId,
      });
      break;
    case `https://api.weixin.qq.com/sns/userinfo?access_token=${mockAuthToken}&openid=${mockOpenId}&lang=zh_CN`:
      retValue = fetchObject({
        openid: mockOpenId,
        ...mockUserInfo,
      });
      break;
    case `https://api.weixin.qq.com/sns/userinfo?access_token=${mockFailedAuthToken}&openid=${mockOpenId}&lang=zh_CN`:
      retValue = fetchObject({
        errcode: 1442,
        errmsg: 'Token expired',
      });
      break;
    case 'https://httpbin.org/post':
    case 'https://httpbin.org/post?success':
      retValue = fetchObject({
        code: 200,
      });
      break;
    case 'https://httpbin.org/post?error':
      retValue = fetchObject({}, false);
      break;
    case 'https://httpbin.org/post?serverError':
      retValue = fetchObject(new Error('Server error'), true, true);
      break;
    case `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APP_ID}&secret=${APP_SECRET}`:
      retValue = fetchObject({
        access_token: mockAccessToken,
        expires_in: 30000,
      });
      break;
    case `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${mockAccessToken}&type=jsapi`:
      retValue = fetchObject({
        errcode: 0,
        ticket: mockJSTicket,
        expires_in: 30000,
      });
      break;
    case wechatJSURL:
      retValue = fetchObject(mockWXScript);
      break;
    default:
      retValue = fetchObject({
        errcode: 11441,
        errmsg: 'Internal Server error',
      }, false);
      break;
  }

  return retValue;
};

module.exports = {
  mockAppId,
  mockAppSecret,
  mockExpireDate,
  mockNow,
  mockSource,
  mockValidate,
  mockConvert,
  mockContext,
  mockFetch,
  mockSuccessCode,
  mockFailedCode,
  mockExpiredCode,
  mockAuthToken,
  mockFailedAuthToken,
  mockRefreshToken,
  mockOpenId,
  mockUserInfo,
  mockWXScript,
};
