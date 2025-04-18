const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  res.status(200).json(blogs);
});

blogRouter.post('/', async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: 'token invalid' });
  }
  const blog = new Blog({ ...req.body, user: user.id });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  const populatedBlog = await savedBlog.populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  res.status(201).json(populatedBlog);
});

blogRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: 'token invalid' });
  }
  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndDelete(blog.id);
    user.blogs = user.blogs.filter((b) => b.id !== id);
    await user.save();
    res.status(204).send();
  } else {
    return res.status(401).json({ error: 'unauthorized' });
  }
});

blogRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  };

  const updated = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  }).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  if (updated === null) {
    return res.status(404).json({ error: 'blog not found' });
  }
  res.status(200).json(updated);
});

module.exports = blogRouter;
