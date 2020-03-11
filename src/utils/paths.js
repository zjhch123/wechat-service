const path = require('path');
const root = path.resolve(__dirname, '../../');
const template = path.resolve(root, 'src', 'templates');

const IS_DEV = process.env.NODE_ENV === 'development';

module.exports = {
  appId: path.resolve(root, IS_DEV ? 'appid.dev' : 'appid'),
  appSecret: path.resolve(root, IS_DEV ? 'appsecret.dev' : 'appsecret'),
  wxJSTemplate: path.resolve(template, 'wxJS.tjs'),
  wxShareTemplate: path.resolve(template, 'wxShare.tjs'),
};
