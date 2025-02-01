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

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((fav, curr) => {
    return fav && curr.likes < fav.likes ? fav : curr;
  }, null);

  return favorite
    ? {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes,
      }
    : null;
};

module.exports = { dummy, totalLikes, favoriteBlog };
