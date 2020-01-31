const { IS_DEV } = require('../constants');
const package = require('../package.json');

const { whitelist } = package;

module.exports = function validateUrl (url) {
  if (IS_DEV) {
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
