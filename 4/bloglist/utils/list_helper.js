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

const mostBlogs = (blogs) => {
  const authors = {};
  blogs.forEach((blog) => {
    const author = blog.author;
    if (!Object.keys(authors).includes(author)) {
      authors[author] = 0;
    }
    authors[author]++;
  });

  //creates array in the form [[author, blogcount], [..]..]
  const authorList = Object.keys(authors).map((key) => [key, authors[key]]);
  const prolific = authorList.reduce((pro, curr) => {
    return pro && curr[1] < pro[1] ? pro : curr;
  }, null);

  return prolific ? { author: prolific[0], blogs: prolific[1] } : null;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
