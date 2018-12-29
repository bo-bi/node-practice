const koa = require('koa');
const app = new koa();

app.use(async (ctx, next) => {
  // 请求的形式是否接受 'application/json'
  // console.log(ctx.request.accepts('application/json'));
  // console.log(ctx.request.accepts(['text/plain']));
  // ctx.body = 'hi';

  if (!ctx.request.accepts(['text/plain'])) {
    ctx.throw(406, 'not accept!')
  }
});

app.listen(8888);