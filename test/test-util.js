const mockExpireDate = Date.now() + 999999;

const mockAppId = 'wx06f30708fbccb63e';
const mockAppSecret = '285f895ac9dd49973d36ad0c8704dfb1';

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

module.exports = {
  mockAppId,
  mockAppSecret,
  mockExpireDate,
  mockSource,
  mockValidate,
  mockConvert,
  mockContext,
};
