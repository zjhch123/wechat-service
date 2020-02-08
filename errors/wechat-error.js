class WechatError extends Error {
  constructor (errcode, errmsg) {
    super(errmsg);
    this.errcode = errcode;
    this.errmsg = errmsg;
  }
}

module.exports = WechatError;
