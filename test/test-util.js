const mockExpireDate = Date.now() + 999999;

const mockAppId = 'wx06f30708fbccb63e';
const mockAppSecret = '285f895ac9dd49973d36ad0c8704dfb1';
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
    ok: isSuccess,
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
};
