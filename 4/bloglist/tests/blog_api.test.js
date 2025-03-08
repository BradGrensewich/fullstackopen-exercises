const { test, after, beforeEach, describe } = require('node:test');
const app = require('../app');
const supertest = require('supertest');
const helper = require('./test_helper');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const User = require('../models/user');
const assert = require('node:assert');
const jwt = require('jsonwebtoken');

const api = supertest(app);

describe('when there are intially some blogs saved', () => {
  beforeEach(async () => {
    await User.deleteMany({});
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
  describe('addition of a new blog to db', () => {
    test('is successfully when blog object is valid and token is provided', async () => {
      const token = await helper.getValidToken();
      await api
        .post('/api/blogs')
        .send(helper.validBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsInDb = await helper.getCurrentBlogs();
      delete blogsInDb[blogsInDb.length - 1].id;
      assert.strictEqual(blogsInDb.length, helper.initialBlogsList.length + 1);
      const newBlog = blogsInDb[blogsInDb.length - 1];
      delete newBlog.user;
      assert.deepStrictEqual(blogsInDb[blogsInDb.length - 1], helper.validBlog);
    });

    test('saves with zero likes when "likes" property is not defined', async () => {
      const blogWithoutLikesProperty = helper.validBlog;
      delete blogWithoutLikesProperty.likes;
      const token = await helper.getValidToken();

      await api
        .post('/api/blogs')
        .send(blogWithoutLikesProperty)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsInDb = await helper.getCurrentBlogs();
      assert.strictEqual(blogsInDb[blogsInDb.length - 1].likes, 0);
    });

    test('fails and responds with 400 when blog object has no "title" property', async () => {
      const blogWithoutTitleProperty = helper.validBlog;
      delete blogWithoutTitleProperty.title;
      const token = await helper.getValidToken();
      await api
        .post('/api/blogs')
        .send(blogWithoutTitleProperty)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
    });

    test('fails and responds with 400 when blog object has no "url" property', async () => {
      const blogWithoutUrlProperty = helper.validBlog;
      delete blogWithoutUrlProperty.url;
      const token = await helper.getValidToken();
      await api
        .post('/api/blogs')
        .send(blogWithoutUrlProperty)
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
    });

    test('fails and responds with 401 when token is not provided', async () => {
      await api.post('/api/blogs').send(helper.validBlog).expect(401);
    });
  });

  describe('deleting a blog', () => {
    test('succeeds with status code 204', async () => {
      const token = await helper.getValidToken();
      const decoded = jwt.verify(token, process.env.SECRET);
      const blog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
      };
      blog.user = decoded.id;
      const blogToDelete = new Blog(blog);
      const savedBlog = await blogToDelete.save();
      const blogsBefore = await helper.getCurrentBlogs();

      await api
        .delete(`/api/blogs/${savedBlog.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      const blogsAfter = await helper.getCurrentBlogs();
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
      const blogsBefore = await helper.getCurrentBlogs();
      const blogToUpdate = { ...blogsBefore[0], likes: 999, author: 'updated' };
      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      assert.deepStrictEqual(response.body, blogToUpdate);

      const blogsAfter = await helper.getCurrentBlogs();
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
});

describe('adding a user', async () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('succeed when user object has unique username, and password and usernam aree of minimum length', async () => {
    const user = { username: 'Test user', name: 'Brad G', password: 'secret' };
    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const users = await helper.getCurrentUsers();
    const userNames = users.map((u) => u.username);
    assert(userNames.includes(user.username));
  });

  test('fails when username is too short', async () => {
    const user = { username: 'a', name: 'Brad G', password: 'secret' };
    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert(
      result.body.error.includes('is shorter than the minimum allowed length'),
    );
    const users = await helper.getCurrentUsers();
    assert.strictEqual(users.length, 0);
  });

  test('fails when password is too short', async () => {
    const user = { username: 'Test user', name: 'Brad G', password: 's' };
    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert(
      result.body.error.includes('is shorter than the minimum allowed length'),
    );
    const users = await helper.getCurrentUsers();
    assert.strictEqual(users.length, 0);
  });

  test('fails when username is already taken', async () => {
    const username = 'Can only be used once';
    const initial = new User({
      username,
      name: 'test',
      passwordHash: 'usdbfc76huinf78hui',
    });
    await initial.save();
    const user = { username, name: 'Brad G', password: 'secret' };
    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(result.body.error, 'expected `username` to be unique');
    const users = await helper.getCurrentUsers();
    assert.strictEqual(users.length, 1);
  });
});

after(async () => {
  await mongoose.connection.close();
});
