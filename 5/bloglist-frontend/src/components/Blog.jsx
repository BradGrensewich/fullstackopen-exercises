import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, onIncrementLike }) => {
  const [visible, setVisible] = useState(false);
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
            likes: {blog.likes}{' '}
            <button onClick={onIncrementLike}>like</button>
          </li>
          <li>added by: {blog.user.name} </li>
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
