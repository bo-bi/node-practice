const Koa = require('koa');

const app = new Koa();

const Router = require('koa-router');

const router = new Router();

const koaBody = require('koa-body');

app.use(koaBody());

app
  .use(router.routes())
  .use(router.allowedMethods());


const { Sequelize, Op } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'koa_post_server',
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

const UserModel = sequelize.define('user', {
  name: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  }
});

UserModel.sync();

(async function create() {
  // await UserModel.create({
  //   name: '刘德华',
  //   age: 50
  // });

  // 两种方式

  // 1.promise
  // UserModel.findAll().then((user) => {
  //   console.log(user.map((user) => user.dataValues));
  // });

  // 2. await
  const users = await UserModel.findAll();
  // console.log(users.map( user => user.dataValues));
})();

async function getList () {
  let list = await UserModel.findAll();
  list = list.map(user => user.dataValues);
  return list;
}

async function createUser (body) {
  const { user } = body;
  UserModel.create(user)
}

async function getOneUser (id) {
  console.log(id, 'id');
  const oneUser = await UserModel.findOne({
    where: {
      id: {
        [Op.eq]: id,
      }
    }
  });
  return oneUser;
}

async function yuanshi() {
  let aaa;
  await sequelize.query("SELECT name FROM users")
    .spread((results, metadata) => {
      // 结果将是一个空数组，元数据将包含受影响的行数。
      // console.log(results, 'results')
      // console.log(metadata, 'metadata')
      aaa = results;
      console.log(aaa, 'aaa')
    })
  console.log(aaa, '123');
  return aaa;
}

router
  .get('/user', async (ctx, next) => {
    // 以下这种不能获得数据
    const list = await getList();
    ctx.body = list;
  })
  .post('/user', async (ctx, next) => {
    // console.log(ctx.request.body, 'body');
    const created = await createUser(ctx.request.body);
    console.log(created, 'created');
    ctx.body = ctx.request.body;

  })
  .get('/user/:id', async (ctx, body) => {

  
    const { id }= ctx.params;
    // console.log(id, 'params');
    const foundOne = await getOneUser(id);
    ctx.body = foundOne;
  })
  .get('/ys', async (ctx, next) => {
    const results = await yuanshi();
    console.log(results, 'results');
    ctx.body = results;
  })




app.listen(9999);
