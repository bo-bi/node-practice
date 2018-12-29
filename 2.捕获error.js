const koa = require('koa');
const app = new koa();

async function mw1 (ctx, next) {
  ctx.body = '456'
  console.log(1);
  await next();
  // try {
  //   await next();
  // }catch(e) {
  //   console.log(e);
  // }
  console.log(2);
}
async function mw2 (ctx, next) {
  console.log(3);
  await next();
  throw new Error('error in mw2');
  console.log(4);
}

async function mw3(ctx, next) {
  console.log(5);
  await next();
  throw new Error('error in mw3');
  console.log(6);
}

app.use(mw1);
app.use(mw2);
app.use(mw3);

app.on('error', (err) => {
  console.log(err);
  console.log('on error');
});

app.listen(3002);

//1 3 5 e 