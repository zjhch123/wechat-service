# Usage

You should create the `appid` and `appsecret` file in the root path before start.

The whitelist is defined in the `package.json`.

```html
<script src="{service_path}/wxShare"></script>
<script>
window.wxShare.setShareData({
  title: 'xxx',
  desc: 'xxx',
  imgUrl: 'xxx',
  link: 'xxx', // default is window.location.href,
  callback: () => {}, // default is () => {}
})
</script>
```
