const path = require('path');
const root = path.resolve(__dirname, '../');
const template = path.resolve(root, 'template');

module.exports = {
  appId: path.resolve(root, 'appid'),
  appSecret: path.resolve(root, 'appsecret'),
  wxShareTemplate: path.resolve(template, 'wxShare.tjs'),
};
