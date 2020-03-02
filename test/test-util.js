const mockExpireDate = Date.now() + 999999;

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

module.exports = {
  mockExpireDate,
  mockSource,
  mockValidate,
  mockConvert,
};
