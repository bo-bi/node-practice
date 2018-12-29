const koa = require('koa');
const app = new koa();

app.use(async (ctx, next) => {
  ctx.respond = false;
  // 并未向前端返回任何东西，超时报一个错。
  ctx.body = '我是谁？'
});

app.listen(3006);