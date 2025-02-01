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

//helper function
//author should be an object of the form
//{authorName: targetPropertyCount, ...}
//returns max author as array length 2 the form [authorName, count]
const getMaxAuthor = (authors) => {
  const authorList = Object.keys(authors).map((key) => [key, authors[key]]);
  const max = authorList.reduce((pro, curr) => {
    return pro && curr[1] < pro[1] ? pro : curr;
  }, null);
  return max;
};

const mostBlogs = (blogs) => {
  //creates obj in form {authorName: blogCount, ...}
  const authors = {};
  blogs.forEach((blog) => {
    const author = blog.author;
    if (!Object.keys(authors).includes(author)) {
      authors[author] = 0;
    }
    authors[author]++;
  });

  const prolific = getMaxAuthor(authors);
  return prolific ? { author: prolific[0], blogs: prolific[1] } : null;
};

const mostLikes = (blogs) => {
  //creates obj in form {authorName: likeCount, ...}
  const authors = {};
  blogs.forEach((blog) => {
    const author = blog.author;
    if (!Object.keys(authors).includes(author)) {
      authors[author] = 0;
    }
    authors[author] += blog.likes;
  });

  const popular = getMaxAuthor(authors);
  return popular ? { author: popular[0], likes: popular[1] } : null;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
