import { useState, useEffect } from 'react';
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

  //LOGIN stuff
  const loginUser = (userData) => {
    setUser(userData);
    blogService.setToken(userData.token);
    window.localStorage.setItem('user', JSON.stringify(userData));
  };

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
      handleMessage('Login successful')
      return true;
    } catch (error) {
      handleErrorMessage(error.message)
      return false;
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    handleMessage('successfully logged out')
  };

  //blog stuff
  const handleCreateBlog = async (title, author, url) => {
    try {
      const savedBlog = await blogService.create(title, author, url);
      setBlogs(blogs.concat(savedBlog));
      handleMessage('successfully added blog')
      return true;
    } catch (error) {
      console.error(error);
      handleErrorMessage(error.message)
    }
  };

  //message stuff
  const handleMessage = (text) => {
    setMessage(text);
    setTimeout(() => {
      setMessage(null);
      setMessageIsError(false)
    }, 5000);
  };

  const handleErrorMessage = (text) => {
    setMessageIsError(true)
    handleMessage(text)    
  };

  return (
    <div>
      {message !== null && <MessageDisplay text={message} isError={messageIsError}/>}
      {user === null && <LoginForm onLogin={handleLogin} />}
      {user !== null && (
        <div>
          <h2>blogs</h2>
          <LoginInfo user={user} onLogout={handleLogout} />

          <BlogForm onCreate={handleCreateBlog} />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
