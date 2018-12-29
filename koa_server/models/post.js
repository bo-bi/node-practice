const { Sequelize, client } = require('../services/sequelize');

const { DataTypes, Op } = Sequelize;

const Model = client.define('post', {
  title: DataTypes.STRING(128),
  content: DataTypes.TEXT,
}); 

// 每次使用 Model 都保证内容是最新的
Model.sync();

async function list({ limit }) {
  const results = await Model.findAll({
    attributes: ['id', 'title'],
    limit,
  });
  console.log(results, 'results');
  return {
    posts: results.map(r => r.dataValues),
  };
}

async function create(post) {
  console.log(post, 'post');
  const created = await Model.create(post);
  return created;
}

async function getOneById(id) {
  const found = await Model.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
  return found;
}

module.exports = {
  Model,
  list,
  create,
  getOneById,
}