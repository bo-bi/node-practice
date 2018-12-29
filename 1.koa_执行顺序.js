const koa = require('koa');
const app = new koa();

async function mw1 (ctx, next) {
  ctx.body = '123'
  console.log(1);
  await next();
  console.log(2);
}
async function mw2 (ctx, next) {
  console.log(3);
  await next();
  console.log(4);
}

async function mw3(ctx, next) {
  console.log(5);
  await next();
  console.log(6);
}

app.use(mw1);
app.use(mw2);
app.use(mw3);

app.listen(3001);

// 135642