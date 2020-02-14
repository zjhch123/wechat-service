# Usage

**Please add your server IP and domain to the whitelist in the Wechat Official Accounts Platform and set your server url in the package.json at first.**

You should create the `appid` and `appsecret` file in the root path before start.

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

**Please set the `auth.postdataURI` in the package.json at first.**

Redirect to `{serverPath}/wxAuth?redirect_uri={}&error_uri={}`, server will redirect user to the wechat auth page.

After auth successfully, server will post the user information to the `auth.postdataURI`, then user will be redirected to the `redirect_uri`.

Server will redirect user to `error_uri` if there has any error. (`error_uri` is optional, the default value is equal to `redirect_uri`)

### User information

```json
{
  "openid": "openId",
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
