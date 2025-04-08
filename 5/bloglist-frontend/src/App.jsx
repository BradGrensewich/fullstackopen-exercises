import { useState, useEffect } from 'react';
import Togglable from './components/Togglable';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import LoginInfo from './components/LoginInfo';
import BlogForm from './components/BlogForm';
import MessageDisplay from './components/MessageDisplay';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageIsError, setMessageIsError] = useState(false);

  //LOGIN stuff
  const loginUser = (userData) => {
    setUser(userData);
    blogService.setToken(userData.token);
    window.localStorage.setItem('user', JSON.stringify(userData));
  };
  console.log('User: ', user)

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      const userData = JSON.parse(userJSON);
      loginUser(userData);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const userData = await loginService.login(username, password);
      loginUser(userData);
      handleMessage('Login successful');
      return true;
    } catch (error) {
      handleErrorMessage('Login failed');
      return false;
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    handleMessage('successfully logged out');
  };

  //blog stuff
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const sortedBlogs = blogs.sort((a, b) => {
    return a.likes - b.likes;
  });

  const handleCreateBlog = async (title, author, url) => {
    try {
      const savedBlog = await blogService.create(title, author, url);
      setBlogs(blogs.concat(savedBlog));
      handleMessage('successfully added blog');
      return true;
    } catch (error) {
      console.error(error);
      handleErrorMessage(error.message);
    }
  };

  const handleIncrementBlogLikes = async (blog) => {
    const changedBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 };
    try {
      const updatedBlog = await blogService.update(changedBlog);
      setBlogs(
        blogs.map((b) => {
          return b.id === updatedBlog.id ? updatedBlog : b;
        }),
      );
    } catch (error) {
      handleErrorMessage(error.message);
    }
  };

  const handleDeletePost = async (blog) => {
    try {
      await blogService.remove(blog);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    } catch (error) {
      handleErrorMessage(error.message);
    }
  };

  //message stuff
  const handleMessage = (text) => {
    setMessage(text);
    setTimeout(() => {
      setMessage(null);
      setMessageIsError(false);
    }, 5000);
  };

  const handleErrorMessage = (text) => {
    setMessageIsError(true);
    handleMessage(text);
  };

  const blogPage = () => {
    return (
      <div>
        <h2>blogs</h2>
        <LoginInfo user={user} onLogout={handleLogout} />
        <Togglable label='create new blog'>
          <BlogForm onCreate={handleCreateBlog} />
        </Togglable>

        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            onIncrementLike={() => handleIncrementBlogLikes(blog)}
            isOwner={blog.user.username === user.username}
            onDeletePost={() => handleDeletePost(blog)}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      {message !== null && (
        <MessageDisplay text={message} isError={messageIsError} />
      )}
      {user === null && <LoginForm onLogin={handleLogin} />}
      {user !== null && blogPage()}
    </div>
  );
};

export default App;
