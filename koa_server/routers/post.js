const Router = require('koa-router');

const Post = require('../models/post');

const router = new Router();

router
  .get('/post', async (ctx, next) => {
    const { posts } = await Post.list({ limit: 5 });
    // console.log(posts, 'posts');
    console.log({
      posts: posts,
    })
    ctx.body = {
      posts,
    };
})
  .post('/post', async(ctx, next) => {
    const { post } = ctx.request.body;
    console.log(ctx.request.body)
    const created = await Post.create(post);
    ctx.body = {
      posts: created,
    };
  })
  .get('/post/:id', async (ctx, next) => {
    const { id } = ctx.params;
    const found = await Post.getOneById(id);
    ctx.body = {
      posts: found
    };
  })
  
module.exports = router;