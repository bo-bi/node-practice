const koa = require('koa');
const app = new koa();
const fs = require('fs');

app.use(async (ctx, next) => {
  // console.log(ctx.response.header, '---header');

  // ctx.response.status = 406;
  // ctx.response.message = 'aaa';

  // 返回的内容不仅可以是一个对象 还能是一个文件，这里为一个流(stream)
  // ctx.response.body = fs.createReadStream('./7.response提供的方法.js');

  // ctx.response.body = { name: 'wh'};

  // response的get、set都是操作的头
  // 设置header
  // ctx.response.set('Content-Type', 'application/json');
  // ctx.response.set('abc', '123');
  // 一个值设置多个值
  // ctx.response.append('abc', '456');
  // 如果不用append需要拼接
  // ctx.response.set('qwe', 'abc=123;sadas=123');

  // 获取header
  // console.log(ctx.response.get('Content-Type'), 'Content-Type');
  // 很多场景不用返回内容
  // ctx.response.body = null;

  ctx.response.type = '.jpeg';
  ctx.response.body = null;  
});

app.listen(8888);