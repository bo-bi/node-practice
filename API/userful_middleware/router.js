const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body');

const app = new Koa();
const router = new Router();
app.use(bodyParser());

const users = [
  {
    name: '成龙',
    age: 5
  }
];

router
  .get('/user', async (ctx, next) => {
    ctx.response.body = users;
  })
  .post('/user', async (ctx, next) => {
    // console.log(ctx.request.body, 'ctx.request.body')
    const { user } = ctx.request.body;
    users.push(user);
    ctx.response.body = {
      code: '201',
      message: '创建成功',
      user: user
    }
  })
  .delete('/user', async (ctx, next) => {
    const { user } = ctx.request.body;
    console.log(user, 'user');
  })

app.use(router.routes());

app.listen(8888);