import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import LoginInfo from './components/LoginInfo';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

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
      return true;
    } catch (error) {
      //error message display
      console.error(error);
      return false;
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };
  const handleCreateBlog = async (title, author, url) => {
    try {
      const savedBlog = await blogService.create(title, author, url);
      setBlogs(blogs.concat(savedBlog))
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
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
