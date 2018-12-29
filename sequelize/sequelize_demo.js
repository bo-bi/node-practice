const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  // 数据库的 sql 方言
  dialect: 'postgres',
  // 要绑定的数据库
  database: 'pg_playground'
});

module.exports = {
  Sequelize,
  sequelize,
}