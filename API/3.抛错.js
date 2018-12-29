const koa = require('koa');
const app = new koa();

app.use(async (ctx, next) => {
  ctx.throw(404, 'Not Found 哈哈');
});

app.listen(3005);