const Koa = require('koa');
const Router = require('koa-router');
const log = require('./utils/log');
const wxShare = require('./routes/wx-share');

const app = new Koa();
const router = new Router();

router.get('/wxShare', wxShare);

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(7610);
log('App runs on http://127.0.0.1:7610');
