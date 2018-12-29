const koa = require('koa');
const app = new koa();

app.use(async (ctx, next) => {
  console.log(ctx);
});

app.listen(3003);