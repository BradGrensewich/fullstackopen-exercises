const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const initialBlogsList = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
];

const validBlog = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  likes: 5,
};

const getCurrentBlogs = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

const getCurrentUsers = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};
const getInvalidId = async () => {
  const toDelete = new Blog({
    title: 'To delete',
    author: 'Delete',
    url: 'https://delete.pdf',
    likes: 0,
  });
  const inDB = await toDelete.save();
  const id = inDB.id;
  await Blog.findByIdAndDelete(id);
  return id;
};

const getValidToken = async () => {
  const user = new User({
    username: 'Blog owner',
    name: 'not real',
    passwordHash: 'sjanfsdjnfui',
    blogs: [],
  });
  const savedUser = await user.save();
  const testToken = jwt.sign(
    { username: savedUser.username, id: savedUser.id },
    process.env.SECRET,
    { expiresIn: '1m' },
  );
  return testToken;
};

module.exports = {
  initialBlogsList,
  validBlog,
  getCurrentBlogs,
  getCurrentUsers,
  getInvalidId,
  getValidToken,
};
