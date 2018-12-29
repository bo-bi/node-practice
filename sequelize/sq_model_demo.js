const { sequelize, Sequelize } = require('./sequelize_demo');
// mpn install pg(这里不加 -g！)
const { DataTypes, Op } = Sequelize;
// 哪个表对应哪个数据结构
// 参数：  表名 数据结构
// 感受：相当于在本地建立一个表，然后让 sequelize 同步到数据库，相当于python 操作数据库，而不是自己建表
const PostModel = sequelize.define('posts', {
  title: {
    // 类型为64位的字符串
    type: DataTypes.STRING(64),
  },
  content: DataTypes.TEXT,
  created: DataTypes.TIME
})

// 同步数据结构到数据库中
PostModel.sync();

// 立即执行的async函数
(async () => {
  // 创建新的字段
  const created = await PostModel.create({
    title: '你好啊',
    content: '啦啦啦啦啦啦啦啦啦 I don\'t know 第三篇'
  })

  // 不指定值 
  // const result = await PostModel.find({});
  // find 为查询1条 findAll 为查询所有
  const result = await PostModel.findAll({
    // 只取出对应的字段 
    attributes: ['id', 'title'],
    // 用where增加限制条件
    where: {
      id: {
        // 取出id为1的数据
        // [Op.eq]: 1

        // get -> >= 2
        [Op.gte]: 2,
      }
    }
    // 以上相当与 -> SELECT title FROM posts WHERE id=1;
  });
  console.log(result.map(r => r.dataValues));
})()
  .then((r) => {
    // process.exit(0)表示成功完成，回调函数中，err将为null；
    process.exit(0);
  })
  .catch((e) => {
    console.log(e);
    // process.exit(非0)表示执行失败，回调函数中，err不为null，err.code就是我们传给exit的数字。
    process.exit(1);
  });