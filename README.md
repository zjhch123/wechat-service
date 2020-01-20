# Usage

Please add your server IP and domain to the whitelist in the Wechat management system at first.

You should create the `appid` and `appsecret` file in the root path before start.

The whitelist is defined in the `package.json`.

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
