const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  res.status(200).json(blogs);
});

blogRouter.post('/', async (req, res) => {
  const user = await User.findOne({});
  const blog = new Blog({ ...req.body, user: user.id });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndDelete(id);
  res.status(204).send();
});

blogRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updated = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  if (updated === null) {
    return res.status(404).json({ error: 'blog not found' });
  }
  res.status(200).json(updated);
});

module.exports = blogRouter;
