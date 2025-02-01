const { test, describe } = require('node:test');
const assert = require('node:assert');

const dummyBlogs = require('./dummyData');

const listHelper = require('../utils/list_helper');

describe('dummy', () => {
  test('returns one', () => {
    const blogs = [];
    assert.strictEqual(listHelper.dummy(blogs), 1);
  });
});

describe('total likes', () => {
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
