const path = require('path');
const root = path.resolve(__dirname, '../../');
const template = path.resolve(root, 'src', 'templates');

/* istanbul ignore next */
module.exports = {
  wxJSTemplate: path.resolve(template, 'wxJS.tjs'),
  wxShareTemplate: path.resolve(template, 'wxShare.tjs'),
  logPath: path.resolve(root, 'log'),
};
