const koa = require('koa');
const app = new koa();

// 中间件：app.use(中间件) 就是一种流程或方法的总结
app.use(async ctx => {
  ctx.body = 'Hello World!';
});

app.listen(3000);