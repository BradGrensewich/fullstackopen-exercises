import { useState } from 'react';

const Blog = ({ blog, onIncrementLike, isOwner, onDeletePost }) => {
  const [visible, setVisible] = useState(false);
  console.log('Blog', blog)
  const toggleVisiblity = () => {
    setVisible(!visible);
  };
  const showWhenVisible = { display: visible ? '' : 'none' };
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <div style={showWhenVisible}>
        <ul>
          <li>{blog.url}</li>
          <li>
            likes: {blog.likes} <button onClick={onIncrementLike}>like</button>
          </li>
          <li>added by: {blog.user.name} </li>
          {isOwner && <button onClick={onDeletePost}>remove</button>}
        </ul>

        <button onClick={toggleVisiblity}>hide</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisiblity}>show</button>
      </div>
    </div>
  );
};

export default Blog;
