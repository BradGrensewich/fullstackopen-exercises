const { test, after, beforeEach } = require('node:test');
const app = require('../app');
const supertest = require('supertest');
const helper = require('./test_helper');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const assert = require('node:assert');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let b of helper.initialBlogsList) {
    const blogObject = new Blog(b);
    await blogObject.save();
  }
});

test('API returns correct amount of blogs in JSON', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  assert.strictEqual(res.body.length, helper.initialBlogsList.length);
});

test('blogs are identified by an "id" preperty not "_id"', async () => {
  const res = await api.get('/api/blogs');
  const blogs = res.body;
  blogs.forEach((b) => {
    assert(b.id);
    assert(!b._id);
  });
});

after(async () => {
  await mongoose.connection.close();
});
