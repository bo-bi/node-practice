const koa = require('koa');
const app = new koa();

let i = 0;
app.use(async (ctx, next) => {
  // 重定向次数过多
  console.log(i++);
  // 增加限制
  if (ctx.request.path.indexOf('local') === -1) {
    ctx.response.redirect('/local');
  }else {
    ctx.body = 'redirected!'
  }
});

app.listen(8888);