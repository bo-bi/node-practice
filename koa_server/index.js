const Koa = require('koa');

const koaBody = require('koa-body');

const postRouter = require('./routers/post');

const koa = new Koa();

koa.use(koaBody());

koa
  .use(postRouter.routes())
  .use(postRouter.allowedMethods());

koa.listen(8888);