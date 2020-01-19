const package = require('../package.json');

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

module.exports = validateUrl;
