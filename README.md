![badge](https://github.com/zjhch123/wechat-service/workflows/Deploy/badge.svg)

# Usage

**Please add your server IP and domain to the whitelist in the Wechat Official Accounts Platform and set your server url in the `package.json` at first.**

You should create the `prod.js` in `config` file and set `appid` and `appsecret` in it.

## wxShare

### Init

```html
<script>
window.wxShareConfig = {
  title: 'xxx', // default is document.title
  desc: 'xxx', // default is ''
  imgUrl: 'xxx', // default is page icon
  link: 'xxx', // default is window.location.href,
  callback: () => {}, // default is () => {}
}
</script>
<script src="{service_path}/wxShare"></script>
```

### Reset share information

```html
<script>
// reset the share config
window.wxShare.setShareData({
  title: 'xxx',
  desc: 'xxx',
  imgUrl: 'xxx',
  link: 'xxx',
  callback: () => {},
})
</script>
```

## wxAuth

**Please set the `auth.services` in the `config/prod.js` at first.**

Redirect to `{serverPath}/wxAuth?redirect_uri={}&error_uri={}&service_id={}`, server will redirect user to the wechat auth page.

`service_id` is required. Server will post the user information to the service.

`redirect_uri` is required, when auth and post user information successfully, the visitor will be redirected to the `redirect_uri` with search parameters `appid` and `access_token`.

`error_uri` is optional, default value is equal to `redirect_uri`, Server will redirect user to `error_uri` if there has any error.

### User information

```json
{
  "openid": "openId",
  "access_token": "123abc",
  "nickname":"Nickname",
  "sex": 1,
  "language": "zh_CN",
  "city": "杭州",
  "province": "浙江",
  "country": "中国",
  "headimgurl": "user head img url",
  "privilege": []
}
```
