const Sequelize = require('sequelize');
const client = new Sequelize({
  dialect: 'postgres',
  database: 'koa_post_server'
});

module.exports = {
  Sequelize,
  client
}