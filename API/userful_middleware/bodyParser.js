const koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body');

const app = new koa();

app.use(bodyParser({
  // 拿不到以下这些Content-Type形式的数据
  // application/json
  // json: false,
  // application/x-www-form-urlencoded
  urlencoded: false,
  // 限制上传的json大小最多为10字节
  jsonLimit: 200
}));

// bodyParser可以直接转化接收到的数据格式

app.use(async (ctx, next) => {
  console.log(ctx.request, 'ctx.request')
  const { body } = ctx.request;
  console.log(body, 'body');
  ctx.body = 'got it';
});

app.listen(8888);