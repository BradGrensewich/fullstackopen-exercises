const { test, after, beforeEach, describe } = require('node:test');
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
describe('when there is intially some blogs saved', () => {
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
});

describe('addition of a new blog to db', () => {
  test('is successfully when blog object is valid', async () => {
    await api
      .post('/api/blogs')
      .send(helper.validBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsInDb = await helper.getCurrentDbState();
    delete blogsInDb[blogsInDb.length - 1].id;

    assert.strictEqual(blogsInDb.length, helper.initialBlogsList.length + 1);
    assert.deepStrictEqual(blogsInDb[blogsInDb.length - 1], helper.validBlog);
  });

  test('saves with zero likes when "likes" property is not defined', async () => {
    const blogWithoutLikesProperty = helper.validBlog;
    delete blogWithoutLikesProperty.likes;

    await api
      .post('/api/blogs')
      .send(blogWithoutLikesProperty)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsInDb = await helper.getCurrentDbState();
    assert.strictEqual(blogsInDb[blogsInDb.length - 1].likes, 0);
  });

  test('fails and responds with 400 when blog object has no "title" property', async () => {
    const blogWithoutTitleProperty = helper.validBlog;
    delete blogWithoutTitleProperty.title;
    await api.post('/api/blogs').send(blogWithoutTitleProperty).expect(400);
  });

  test('fails and responds with 400 when blog object has no"url" property', async () => {
    const blogWithoutUrlProperty = helper.validBlog;
    delete blogWithoutUrlProperty.url;
    await api.post('/api/blogs').send(blogWithoutUrlProperty).expect(400);
  });
});

describe('deleting a blog', () => {
  test('succeeds with status code 204', async () => {
    const blogsBefore = await helper.getCurrentDbState();
    const blogToDelete = blogsBefore[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAfter = await helper.getCurrentDbState();
    const idsAfter = blogsAfter.map((b) => {
      return b.id;
    });
    assert.strictEqual(blogsAfter.length, blogsBefore.length - 1);
    assert(!idsAfter.includes(blogToDelete.id));
  });

  test('fails with 404 when no id is provided', async () => {
    await api.delete('/api/notes').expect(404);
  });
});

describe('updating a blog', () => {
  test('succeeds and returns updated note as JSON', async () => {
    const blogsBefore = await helper.getCurrentDbState();
    const blogToUpdate = { ...blogsBefore[0], likes: 999, author: 'updated' };
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    assert.deepStrictEqual(response.body, blogToUpdate);

    const blogsAfter = await helper.getCurrentDbState();
    const updatedBlog = blogsAfter.find((b) => b.id === blogToUpdate.id);
    assert(updatedBlog);
    assert.deepStrictEqual(updatedBlog, blogToUpdate);
  });
  test('fails with 404 on updating with invalid id', async () => {
    const id = await helper.getInvalidId();
    await api
      .put(`/api/blogs/${id}`)
      .send({ title: 'test', author: 'test', url: 'test', likes: 0 })
      .expect(404);
  });
});

after(async () => {
  await mongoose.connection.close();
});
