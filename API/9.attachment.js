const koa = require('koa');
const app = new koa();
const fs = require('fs');

app.use(async (ctx, next) => {
  ctx.response.attachment('9.attachment.js');
  ctx.response.body = fs.createReadStream('./9.attachment.js');
});

app.listen(8888);