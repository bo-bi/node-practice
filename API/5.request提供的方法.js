const koa = require('koa');
const app = new koa();

app.use(async (ctx, next) => {
  // console.log(ctx.request.header);
  // ctx.request.header = {name: '123'};
  // console.log(ctx.request.header);
  // console.log("--------");

  console.log(ctx.request.method, '---method');
  console.log(ctx.request.url, '---url');
  console.log(ctx.request.originalUrl, '---originalUrl');
  console.log(ctx.request.origin, '---origin');
  console.log(ctx.request.href, '---href');
  console.log(ctx.request.path, '---path');
  console.log(ctx.request.search, '---search');
  console.log(ctx.request.querystring, '---querystring');
  console.log(ctx.request.query, '---query');
  console.log(ctx.request.type, '---type');
  console.log(ctx.request.charset, '---charset');
  // 我请求的东西需要不需要刷新（请求的是不是新的）
  console.log(ctx.request.fresh, '---fresh');
});

app.listen(8888);