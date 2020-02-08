# Usage

**Please add your server IP and domain to the whitelist in the Wechat Official Accounts Platform at first.**

You should create the `appid` and `appsecret` file in the root path before start.

## wxShare

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

**Please set the `authPostDataURIHostWhitelist` in the package.json at first, or every server can get user information from your service.**

Redirect to `{serverPath}/wxAuth?redirect_uri={}&postdata_uri={}&error_uri={}`, server will redirect user to wechat auth page.

After auth successful, server will post user information to the `postdata_uri`, then user will be redirected to the `redirect_uri`.

Server will redirect user to `error_uri` if there has any error.
