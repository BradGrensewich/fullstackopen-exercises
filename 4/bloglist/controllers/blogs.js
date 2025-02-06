const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.status(200).json(blogs);
});

blogRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  const result = await blog.save();
  res.status(201).json(result);
});

blogRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndDelete(id);
  res.status(204).send();
});

module.exports = blogRouter;
