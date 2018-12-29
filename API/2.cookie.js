const koa = require('koa');
const app = new koa();

app.use(async (ctx, next) => {
  console.log(ctx.cookies.get('wh'));
  // console.log(ctx.cookies.set('wh', '678'));
});

app.listen(3004);