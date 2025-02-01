const dummy = (blogs) => {
  if (blogs) {
    return 1;
  }
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.reduce((accumulator, blog) => {
    return accumulator + blog.likes;
  }, 0);
  return total;
};

module.exports = { dummy, totalLikes };
