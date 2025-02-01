const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

const dummyBlogs = require('./dummyData');
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0,
  },
];

describe('dummy', () => {
  test('returns one', () => {
    const blogs = [];
    assert.strictEqual(listHelper.dummy(blogs), 1);
  });
});

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5);
  });
  test('when list has many blogs, equals total likes', () => {
    assert.strictEqual(listHelper.totalLikes(dummyBlogs), 36);
  });
  test('when list is empty, equals zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });
});

describe('favorite blog', () => {
  test('when list has only one blog, equals its info', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });
  test('when list has only many blogs, equals one with most likes', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(dummyBlogs), {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
  test('when list is empty, equals null', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null);
  });
});

describe('most blogs', () => {
  test('when list has only one blog, equals its author', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    });
  });
  test('when list has only many blogs, equals author with most blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(dummyBlogs), {
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
  test('when list is empty, equals null', () => {
    assert.strictEqual(listHelper.mostBlogs([]), null);
  });
});
